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
    [price] DECIMAL(10,2) NOT NULL,
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

-- =====================================================
-- STORED PROCEDURES
-- =====================================================

CREATE OR ALTER PROCEDURE [dbo].[spPurchaseCreate]
    @idAccount INT,
    @name NVARCHAR(100),
    @price DECIMAL(10,2),
    @purchaseDate DATETIME2,
    @category NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [dbo].[purchases] ([idAccount], [name], [price], [purchaseDate], [category])
    VALUES (@idAccount, @name, @price, @purchaseDate, @category);

    SELECT SCOPE_IDENTITY() AS [id];
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[spPurchaseUpdate]
    @id INT,
    @idAccount INT,
    @name NVARCHAR(100),
    @price DECIMAL(10,2),
    @purchaseDate DATETIME2,
    @category NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [dbo].[purchases]
    SET [name] = @name,
        [price] = @price,
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

    SELECT [id], [idAccount], [name], [price], [purchaseDate], [category], [createdAt]
    FROM [dbo].[purchases]
    WHERE [id] = @id AND [idAccount] = @idAccount AND [deleted] = 0;
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[spPurchaseList]
    @idAccount INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT [id], [idAccount], [name], [price], [purchaseDate], [category], [createdAt]
    FROM [dbo].[purchases]
    WHERE [idAccount] = @idAccount AND [deleted] = 0
    ORDER BY [purchaseDate] DESC;
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[spPurchaseGetMonthlyTotal]
    @idAccount INT,
    @month INT,
    @year INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT ISNULL(SUM([price]), 0) AS [total]
    FROM [dbo].[purchases]
    WHERE [idAccount] = @idAccount 
      AND [deleted] = 0
      AND MONTH([purchaseDate]) = @month
      AND YEAR([purchaseDate]) = @year;
END;
GO