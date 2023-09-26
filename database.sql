
CREATE TABLE author (
    author_id INTEGER PRIMARY KEY,
    author_name VARCHAR DEFAULT NULL
);

CREATE TABLE publisher (
    publisher_id INTEGER PRIMARY KEY,
    publisher_name VARCHAR
);

CREATE TABLE book_language (
    language_id INTEGER PRIMARY KEY,
    language_code VARCHAR,
    language_name VARCHAR
);

CREATE TABLE book (
    book_id INTEGER PRIMARY KEY,
    title VARCHAR,
    isbn VARCHAR,
    price INTEGER,
    quantityinstock INTEGER,
    language_id INTEGER,
    num_pages INTEGER,
    publication_date DATE,
    publisher_id INTEGER,
    CONSTRAINT fk_book_lang FOREIGN KEY (language_id) REFERENCES book_language (language_id),
    CONSTRAINT fk_book_pub FOREIGN KEY (publisher_id) REFERENCES publisher (publisher_id)
);

CREATE TABLE book_author (
    book_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    CONSTRAINT pk_bookauthor PRIMARY KEY (book_id, author_id),
    CONSTRAINT fk_ba_book FOREIGN KEY (book_id) REFERENCES book (book_id),
    CONSTRAINT fk_ba_author FOREIGN KEY (author_id) REFERENCES author (author_id)
);

CREATE TABLE address_status (
    status_id INTEGER PRIMARY KEY,
    address_status VARCHAR
);

CREATE TABLE country (
    country_id INTEGER PRIMARY KEY,
    country_name VARCHAR
);

CREATE TABLE address (
    address_id INTEGER PRIMARY KEY,
    street_number VARCHAR,
    street_name VARCHAR,
    city VARCHAR,
    country_id INTEGER,
    CONSTRAINT fk_addr_ctry FOREIGN KEY (country_id) REFERENCES country (country_id)
);

CREATE TABLE customer (
    customer_id INTEGER PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR
);

CREATE TABLE customer_address (
    customer_id INTEGER NOT NULL,
    address_id INTEGER NOT NULL,
    status_id INTEGER,
    CONSTRAINT pk_custaddr PRIMARY KEY (customer_id, address_id),
    CONSTRAINT fk_ca_cust FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
    CONSTRAINT fk_ca_addr FOREIGN KEY (address_id) REFERENCES address (address_id)
);

CREATE TABLE shipping_method (
    method_id INTEGER PRIMARY KEY,
    method_name VARCHAR,
    cost REAL
);

CREATE TABLE cust_order (
    order_id INTEGER PRIMARY KEY,
    order_date DATETIME,
    customer_id INTEGER,
    shipping_method_id INTEGER,
    dest_address_id INTEGER,
    CONSTRAINT fk_order_cust FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
    CONSTRAINT fk_order_ship FOREIGN KEY (shipping_method_id) REFERENCES shipping_method (method_id),
    CONSTRAINT fk_order_addr FOREIGN KEY (dest_address_id) REFERENCES address (address_id)
);

CREATE TABLE order_status (
    status_id INTEGER PRIMARY KEY,
    status_value VARCHAR
);

CREATE TABLE order_line (
    line_id INTEGER PRIMARY KEY,
    order_id INTEGER,
    book_id INTEGER,
    price REAL,
    CONSTRAINT fk_ol_order FOREIGN KEY (order_id) REFERENCES cust_order (order_id),
    CONSTRAINT fk_ol_book FOREIGN KEY (book_id) REFERENCES book (book_id)
);

CREATE TABLE order_history (
    history_id INTEGER PRIMARY KEY,
    order_id INTEGER,
    status_id INTEGER,
    status_date DATETIME,
    CONSTRAINT fk_oh_order FOREIGN KEY (order_id) REFERENCES cust_order (order_id),
    CONSTRAINT fk_oh_status FOREIGN KEY (status_id) REFERENCES order_status (status_id)
);



-- ===========================================================================================
-- Create the Role enumeration type
CREATE TYPE Role AS ENUM ('admin', 'customer');

-- Create the user table
CREATE TABLE "user" (
    userId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    role Role
);

-- Create the Authors table
CREATE TABLE "Authors" (
    AuthorID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    Name VARCHAR(255)
);

-- Create the Books table
CREATE TABLE "Books" (
    bookId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255),
    isbn VARCHAR,
    price VARCHAR,
    QuantityInStock INTEGER
);

-- Create the customer table
CREATE TABLE "customer" (
    customerId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR
);

-- Create the Orders table
CREATE TABLE "Orders" (
    OrderID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    CustomerID UUID,
    OrderDate TIMESTAMP,
    quantity INTEGER
);


-- Create the OrderItems table
CREATE TABLE "OrderItems" (
    orderItemId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    OrderID UUID,
    bookId UUID,
    TotalAmount DECIMAL(10, 2)
);

-- Create the autherBooks table
CREATE TABLE "autherBooks" (
    AuthorID UUID,
    bookId UUID,
    CONSTRAINT "autherBooks_pkey" PRIMARY KEY (AuthorID, bookId)
);

-- Create unique index for autherBooks
CREATE UNIQUE INDEX "autherBooks_AuthorID_bookId_idx" ON "autherBooks" (AuthorID, bookId);

-- Add foreign key constraints
ALTER TABLE "Orders"
    ADD CONSTRAINT "FK_Orders_CustomerID" FOREIGN KEY (CustomerID) REFERENCES "customer"(customerId);

ALTER TABLE "OrderItems"
    ADD CONSTRAINT "FK_OrderItems_OrderID" FOREIGN KEY (OrderID) REFERENCES "Orders"(OrderID);

ALTER TABLE "OrderItems"
    ADD CONSTRAINT "FK_OrderItems_bookId" FOREIGN KEY (bookId) REFERENCES "Books"(bookId);

ALTER TABLE "autherBooks"
    ADD CONSTRAINT "FK_autherBooks_AuthorID" FOREIGN KEY (AuthorID) REFERENCES "Authors"(AuthorID);

ALTER TABLE "autherBooks"
    ADD CONSTRAINT "FK_autherBooks_bookId" FOREIGN KEY (bookId) REFERENCES "Books"(bookId);
    
ALTER TABLE Orders
ADD COLUMN quantity INTEGER;


ALTER TABLE OrderItems
ADD COLUMN TotalAmount DECIMAL(10, 2);

CREATE TABLE "Orders2" as select OrderID ,CustomerID ,bookId ,OrderDate ,quantity from "Orders"
