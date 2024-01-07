using HealthHub.Database;
using HealthHub.Interfaces;
using HealthHub.Models;
using HealthHub.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>
    (options =>
    {
        options.UseMySQL(builder.Configuration.GetConnectionString("MyConnectionString"));
    });
builder.Services.AddScoped<FoodRepository>();
builder.Services.AddScoped<SearchRepository>();
builder.Services.AddScoped<ISearch, SearchRepository>();
builder.Services.AddScoped<IFood, FoodRepository>();

builder.Services.AddIdentity<AppUser, IdentityRole>()
    .AddEntityFrameworkStores<DataContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.MapControllers();

app.Run();
