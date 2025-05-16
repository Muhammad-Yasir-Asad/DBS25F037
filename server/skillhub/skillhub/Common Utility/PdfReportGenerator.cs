using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.text.pdf.draw;
using System;
using System.Data;
using System.IO;

namespace skillhub.Common_Utility
{
    public class PdfReportGenerator
    {
        public static string GeneratePdfReport(DataTable dataTable, string reportHeading, string companyName = "Skill Hub", string reportSubtitle = "")
        {
            try
            {
                // Validate input
                if (dataTable == null || dataTable.Columns.Count == 0)
                    throw new ArgumentException("DataTable cannot be null or empty");

                // Create report directory if it doesn't exist
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Reports");
                Directory.CreateDirectory(filePath); // No need to check existence first

                string fileName = $"{reportHeading.Replace(" ", "")}{DateTime.Now:yyyyMMdd_HHmmss}.pdf";
                string fullPath = Path.Combine(filePath, fileName);

                // Create document with margins
                Document document = new Document(PageSize.A4, 40f, 40f, 60f, 60f); // Left, Right, Top, Bottom margins

                using (FileStream fs = new FileStream(fullPath, FileMode.Create))
                {
                    PdfWriter writer = PdfWriter.GetInstance(document, fs);

                    // Add header/footer using page events
                    var pageEventHandler = new PdfPageEventHandler(companyName);
                    writer.PageEvent = pageEventHandler;

                    document.Open();

                    // Company logo (would need actual image file)
                    /*
                    string logoPath = Path.Combine(Directory.GetCurrentDirectory(), "Assets", "company_logo.png");
                    if (File.Exists(logoPath))
                    {
                        Image logo = Image.GetInstance(logoPath);
                        logo.ScaleToFit(100f, 60f);
                        logo.Alignment = Image.ALIGN_CENTER;
                        document.Add(logo);
                    }
                    */

                    // Report heading
                    Font titleFont = FontFactory.GetFont("Arial", 18, Font.BOLD, BaseColor.DARK_GRAY);
                    Paragraph title = new Paragraph(companyName, titleFont)
                    {
                        Alignment = Element.ALIGN_CENTER,
                        SpacingAfter = 10f
                    };
                    document.Add(title);

                    // Report subtitle
                    if (!string.IsNullOrEmpty(reportSubtitle))
                    {
                        Font subtitleFont = FontFactory.GetFont("Arial", 12, Font.NORMAL, BaseColor.GRAY);
                        Paragraph subtitle = new Paragraph(reportSubtitle, subtitleFont)
                        {
                            Alignment = Element.ALIGN_CENTER,
                            SpacingAfter = 15f
                        };
                        document.Add(subtitle);
                    }

                    // Main report heading
                    Font headingFont = FontFactory.GetFont("Arial", 16, Font.BOLD, new BaseColor(0, 102, 204));
                    Paragraph heading = new Paragraph(reportHeading, headingFont)
                    {
                        Alignment = Element.ALIGN_CENTER,
                        SpacingAfter = 20f
                    };
                    document.Add(heading);

                    // Report generation timestamp
                    Font timestampFont = FontFactory.GetFont("Arial", 10, Font.ITALIC, BaseColor.GRAY);
                    Paragraph timestamp = new Paragraph($"Generated on: {DateTime.Now:yyyy-MM-dd hh:mm tt}", timestampFont)
                    {
                        Alignment = Element.ALIGN_RIGHT,
                        SpacingAfter = 15f
                    };
                    document.Add(timestamp);

                    // Create table with calculated column widths
                    PdfPTable pdfTable = new PdfPTable(dataTable.Columns.Count)
                    {
                        WidthPercentage = 100,
                        SpacingBefore = 10f,
                        SpacingAfter = 20f
                    };

                    // Set column widths (adjust as needed)
                    float[] columnWidths = new float[dataTable.Columns.Count];
                    for (int i = 0; i < dataTable.Columns.Count; i++)
                    {
                        columnWidths[i] = 1f; // Equal width by default
                    }
                    pdfTable.SetWidths(columnWidths);

                    // Table header
                    Font headerFont = FontFactory.GetFont("Arial", 10, Font.NORMAL, BaseColor.WHITE);
                    foreach (DataColumn column in dataTable.Columns)
                    {
                        PdfPCell headerCell = new PdfPCell(new Phrase(column.ColumnName, headerFont))
                        {
                            HorizontalAlignment = Element.ALIGN_CENTER,
                            VerticalAlignment = Element.ALIGN_MIDDLE,
                            BackgroundColor = new BaseColor(51, 122, 183), // Bootstrap primary blue
                            Padding = 8f
                        };
                        pdfTable.AddCell(headerCell);
                    }

                    // Table data
                    Font cellFont = FontFactory.GetFont("Arial", 10, Font.NORMAL, BaseColor.BLACK);
                    bool alternateRow = false;
                    foreach (DataRow row in dataTable.Rows)
                    {
                        foreach (var cell in row.ItemArray)
                        {
                            PdfPCell dataCell = new PdfPCell(new Phrase(cell?.ToString() ?? string.Empty, cellFont))
                            {
                                HorizontalAlignment = Element.ALIGN_LEFT,
                                VerticalAlignment = Element.ALIGN_MIDDLE,
                                BackgroundColor = alternateRow ? new BaseColor(240, 240, 240) : BaseColor.WHITE,
                                Padding = 6f
                            };
                            pdfTable.AddCell(dataCell);
                        }
                        alternateRow = !alternateRow;
                    }

                    document.Add(pdfTable);

                    // Add summary or notes section if needed
                    Font notesFont = FontFactory.GetFont("Arial", 10, Font.ITALIC, BaseColor.DARK_GRAY);
                    Paragraph notes = new Paragraph("* This report is generated automatically. Please contact support for any questions.", notesFont)
                    {
                        Alignment = Element.ALIGN_LEFT,
                        SpacingBefore = 20f
                    };
                    document.Add(notes);

                    document.Close();
                }

                return fullPath;
            }
            catch (Exception ex)
            {
                // Log error (implementation depends on your logging framework)
                // Logger.Error($"Error generating PDF report: {ex.Message}", ex);
                throw new ApplicationException("Failed to generate PDF report", ex);
            }
        }

        // Custom page event handler for header/footer
        private class PdfPageEventHandler : PdfPageEventHelper
        {
            private readonly string _companyName;
            private PdfTemplate _totalPages;
            private BaseFont _baseFont;

            public PdfPageEventHandler(string companyName)
            {
                _companyName = companyName;
            }

            public override void OnOpenDocument(PdfWriter writer, Document document)
            {
                _baseFont = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                _totalPages = writer.DirectContent.CreateTemplate(30, 16);
            }

            public override void OnEndPage(PdfWriter writer, Document document)
            {
                // Add header
                PdfContentByte cb = writer.DirectContent;
                cb.SetColorStroke(BaseColor.LIGHT_GRAY);
                cb.SetLineWidth(0.5f);
                cb.MoveTo(document.Left, document.Top + 10);
                cb.LineTo(document.Right, document.Top + 10);
                cb.Stroke();

                // Add footer
                cb.MoveTo(document.Left, document.Bottom - 20);
                cb.LineTo(document.Right, document.Bottom - 20);
                cb.Stroke();

                // Footer text
                cb.BeginText();
                cb.SetFontAndSize(_baseFont, 10);
                cb.SetColorFill(BaseColor.DARK_GRAY);

                // Left side: Company name
                cb.ShowTextAligned(PdfContentByte.ALIGN_LEFT, _companyName,
                    document.Left, document.Bottom - 30, 0);

                // Right side: Page number
                string text = $"Page {writer.PageNumber} of ";
                float textWidth = _baseFont.GetWidthPoint(text, 10);
                cb.ShowTextAligned(PdfContentByte.ALIGN_RIGHT, text,
                    document.Right - textWidth - 30, document.Bottom - 30, 0);
                cb.EndText();

                // Add total pages
                cb.AddTemplate(_totalPages, document.Right - 30, document.Bottom - 30);
            }

            public override void OnCloseDocument(PdfWriter writer, Document document)
            {
                _totalPages.BeginText();
                _totalPages.SetFontAndSize(_baseFont, 10);
                _totalPages.SetColorFill(BaseColor.DARK_GRAY);
                _totalPages.ShowText(writer.PageNumber.ToString());
                _totalPages.EndText();
            }
        }
    }
}