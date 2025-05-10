using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using skillhub.RepositeryLayer;
using skillhub.ServiceLayer;
using skillhub.Helpers;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

builder.Services.AddControllers();

#region Dependency Injection
builder.Services.AddScoped<UserInterfaceSL, UserSL>();
builder.Services.AddScoped<UserInterfaceRL, UserRL>();
builder.Services.AddScoped<IFreelancerSL, FreelancerSL>();
builder.Services.AddScoped<IFreelancerRL, FreelancerRL>();
builder.Services.AddScoped<IMessageSL, MessageSL>();
builder.Services.AddScoped<IMessageRL, MessageRL>();
builder.Services.AddScoped<IWalletSL, WalletSL>();
builder.Services.AddScoped<IWalletRL, WalletRL>();
#endregion

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IDbConnectionFactory, DbConnectionFactory>();

var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
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



var app = builder.Build();


    app.UseSwagger();
    app.UseSwaggerUI();



    app.UseCors("AllowAll"); // Allow all origins for development

    app.UseRouting();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });



app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
