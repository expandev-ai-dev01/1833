-- =====================================================
-- Database Migration: Initial Schema for FoodTrack
-- =====================================================

-- =====================================================
-- TABLES
-- =====================================================

-- Create purchases table
CREATE TABLE [dbo].[purchases] (
    [id] INT IDENTITY(1,1) NOT NULL,
    [idAccount] INT NOT NULL,
    [name] NVARCHAR(100) NOT NULL,
    [quantity] DECIMAL(10,3) NOT NULL,
    [unitPrice] DECIMAL(10,2) NOT NULL,
    [totalPrice] DECIMAL(10,2) NOT NULL,
    [purchaseDate] DATETIME2 NOT NULL,
    [category] NVARCHAR(50) NULL,
    [deleted] BIT NOT NULL DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [updatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

ALTER TABLE [dbo].[purchases]
ADD CONSTRAINT [pkPurchases] PRIMARY KEY CLUSTERED ([id]);
GO

-- =====================================================
-- INDEXES
-- =====================================================

CREATE NONCLUSTERED INDEX [ixPurchases_Account]
ON [dbo].[purchases]([idAccount])
WHERE [deleted] = 0;
GO

CREATE NONCLUSTERED INDEX [ixPurchases_Date]
ON [dbo].[purchases]([purchaseDate])
WHERE [deleted] = 0;
GO

CREATE NONCLUSTERED INDEX [ixPurchases_Category]
ON [dbo].[purchases]([category])
WHERE [deleted] = 0;
GO

-- =====================================================
-- STORED PROCEDURES
-- =====================================================

CREATE OR ALTER PROCEDURE [dbo].[spPurchaseCreate]
    @idAccount INT,
    @name NVARCHAR(100),
    @quantity DECIMAL(10,3),
    @unitPrice DECIMAL(10,2),
    @totalPrice DECIMAL(10,2),
    @purchaseDate DATETIME2,
    @category NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [dbo].[purchases] (
        [idAccount], 
        [name], 
        [quantity], 
        [unitPrice], 
        [totalPrice], 
        [purchaseDate], 
        [category]
    )
    VALUES (
        @idAccount, 
        @name, 
        @quantity, 
        @unitPrice, 
        @totalPrice, 
        @purchaseDate, 
        @category
    );

    SELECT SCOPE_IDENTITY() AS [id];
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[spPurchaseUpdate]
    @id INT,
    @idAccount INT,
    @name NVARCHAR(100),
    @quantity DECIMAL(10,3),
    @unitPrice DECIMAL(10,2),
    @totalPrice DECIMAL(10,2),
    @purchaseDate DATETIME2,
    @category NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [dbo].[purchases]
    SET [name] = @name,
        [quantity] = @quantity,
        [unitPrice] = @unitPrice,
        [totalPrice] = @totalPrice,
        [purchaseDate] = @purchaseDate,
        [category] = @category,
        [updatedAt] = GETUTCDATE()
    WHERE [id] = @id AND [idAccount] = @idAccount AND [deleted] = 0;

    IF @@ROWCOUNT = 0
    BEGIN
        ;THROW 51000, 'recordNotFound', 1;
    END
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[spPurchaseDelete]
    @id INT,
    @idAccount INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [dbo].[purchases]
    SET [deleted] = 1,
        [updatedAt] = GETUTCDATE()
    WHERE [id] = @id AND [idAccount] = @idAccount AND [deleted] = 0;

    IF @@ROWCOUNT = 0
    BEGIN
        ;THROW 51000, 'recordNotFound', 1;
    END
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[spPurchaseGet]
    @id INT,
    @idAccount INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        [id], 
        [idAccount], 
        [name], 
        [quantity], 
        [unitPrice], 
        [totalPrice], 
        [purchaseDate], 
        [category], 
        [createdAt], 
        [updatedAt]
    FROM [dbo].[purchases]
    WHERE [id] = @id AND [idAccount] = @idAccount AND [deleted] = 0;
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[spPurchaseList]
    @idAccount INT,
    @searchTerm NVARCHAR(100) = NULL,
    @startDate DATETIME2 = NULL,
    @endDate DATETIME2 = NULL,
    @category NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        [id], 
        [idAccount], 
        [name], 
        [quantity], 
        [unitPrice], 
        [totalPrice], 
        [purchaseDate], 
        [category], 
        [createdAt], 
        [updatedAt]
    FROM [dbo].[purchases]
    WHERE [idAccount] = @idAccount 
      AND [deleted] = 0
      AND (@searchTerm IS NULL OR [name] LIKE '%' + @searchTerm + '%')
      AND (@startDate IS NULL OR [purchaseDate] >= @startDate)
      AND (@endDate IS NULL OR [purchaseDate] <= @endDate)
      AND (@category IS NULL OR [category] = @category)
    ORDER BY [purchaseDate] DESC;
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[spPurchaseGetTotal]
    @idAccount INT,
    @searchTerm NVARCHAR(100) = NULL,
    @startDate DATETIME2 = NULL,
    @endDate DATETIME2 = NULL,
    @category NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT ISNULL(SUM([totalPrice]), 0) AS [total]
    FROM [dbo].[purchases]
    WHERE [idAccount] = @idAccount 
      AND [deleted] = 0
      AND (@searchTerm IS NULL OR [name] LIKE '%' + @searchTerm + '%')
      AND (@startDate IS NULL OR [purchaseDate] >= @startDate)
      AND (@endDate IS NULL OR [purchaseDate] <= @endDate)
      AND (@category IS NULL OR [category] = @category);
END;
GO