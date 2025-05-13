using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using skillhub.RepositeryLayer;
using skillhub.ServiceLayer;
using skillhub.Helpers;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;

// Create builder with web root configuration FIRST
var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    ContentRootPath = Directory.GetCurrentDirectory(),
    WebRootPath = "wwwroot"
});

// Add services to the container
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

builder.Services.AddControllers();

#region Dependency Injection
builder.Services.AddScoped<UserInterfaceSL, UserSL>();
builder.Services.AddScoped<UserInterfaceRL, UserRL>();
builder.Services.AddScoped<IFreelancerSL, FreelancerSL>();
builder.Services.AddScoped<IFreelancerRL, FreelancerRL>();
builder.Services.AddScoped<IGigSL, GigSL>();
builder.Services.AddScoped<IGigRL, GigRL>();
builder.Services.AddScoped<IGigPackageBasicSL, GigPackageBasicSL>();
builder.Services.AddScoped<IGigPackageStandardSL, GigPackageStandardSL>();
builder.Services.AddScoped<IGigPackagePremiumSL, GigPackagePremiumSL>();
builder.Services.AddScoped<IGigPackageRL, GigPackageRL>();
builder.Services.AddScoped<IGigSearchRepository, GigSearchRepository>();
builder.Services.AddScoped<IGigSearchService, GigSearchService>();
builder.Services.AddScoped<IMessageSL, MessageSL>();
builder.Services.AddScoped<IMessageRL, MessageRL>();
builder.Services.AddScoped<IWalletSL, WalletSL>();
builder.Services.AddScoped<IWalletRL, WalletRL>();
builder.Services.AddScoped<IBlockedRL, BlockedRL>();
builder.Services.AddScoped<IBlockedSL, BlockedSL>();
builder.Services.AddScoped<IReportRL, ReportRL>();
builder.Services.AddScoped<IReportSL, ReportSL>();
builder.Services.AddScoped<IGigPackageSkillRL, GigPackageSkillRL>();
builder.Services.AddScoped<IGigPackageSkillSL, GigPackageSkillSL>();
#endregion

// Configure JWT Authentication
var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IDbConnectionFactory, DbConnectionFactory>();

var app = builder.Build();

// Ensure wwwroot directory exists
var wwwrootPath = Path.Combine(app.Environment.ContentRootPath, "wwwroot");
if (!Directory.Exists(wwwrootPath))
{
    Directory.CreateDirectory(wwwrootPath);
    Console.WriteLine($"Created wwwroot directory at: {wwwrootPath}");
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors("AllowAll");
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();