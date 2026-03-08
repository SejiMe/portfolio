---
title: "EF Core Design Time Setup!"
date: "2025-06-15"

layout: "../../layouts/PostLayout.astro"
description: "Learn how you can setup your EF Core Design Time Factory for Code First Approach"

img_path : "/portfolio/posts/LucaBravo_unsplash.webp"
img_alt : "Code by Luca Bravo on Unsplash"
---

## Bad Practice

See Code below why its bad. exposed connection string makes the shipping of projects unsecured especially if you are using version control such as GitHub. Why? IT IS EXPOSED.

```cs

using Microsoft.EntityFrameworkCore.Design;

public class ImsDbDesignFactory : IDesignTimeDbContextFactory<ImsDBContext>
{

    public ImsDbDesignFactory()
    {
        
    }
    
    
    public ImsDBContext CreateDbContext(string[] args)
    {

        
        string connectionString =  "Host=localhost;Database=ims;Username=postgres;Password=yourpassword";
        
        var optionsBuilder = new DbContextOptionsBuilder<ImsDBContext>();
        // Use a hardcoded connection string for design-time purposes.
        optionsBuilder.UseNpgsql(connectionString);

        return new ImsDBContext(optionsBuilder.Options);
    }
}

```

## Good Practice

So What is the alternative? use environment variables or my personal favorite Options Pattern.
Click -> [Options Pattern](https://learn.microsoft.com/en-us/dotnet/core/extensions/options) for the Tutorial.

```cs

using Microsoft.EntityFrameworkCore.Design;

public class ImsDbDesignFactory : IDesignTimeDbContextFactory<ImsDBContext>
{

    public ImsDbDesignFactory()
    {
        
    }
    
    
    public ImsDBContext CreateDbContext(string[] args)
    {
        var configurations = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .AddUserSecrets<ImsDbDesignFactory>() // Just add this Add User Secrets
            .Build();
        
        var optionsBuilder = new DbContextOptionsBuilder<ImsDBContext>();

        optionsBuilder.UseNpgsql(configurations.GetSection(nameof(ConnectionOptions))["ImsConnectionString"]);

        return new ImsDBContext(optionsBuilder.Options);
    }
}
```

Simple as that! now you can use and there will be no more errors.

```bash
    dotnet ef migrations add YourMigrationName
```

Photo by [Luca Bravo][1] on [Unsplash][2]

[1]: https://unsplash.com/@lucabravo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
[2]: https://unsplash.com/photos/turned-on-gray-laptop-computer-XJXWbfSo2f0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
