
The database consists of 12 tables.
    The first table is called user where we have id_user with an integer(11) data type which is an primary key, login with a varchar(25) data type, email with a varchar(25) data type, phone with a varchar(25) data type, password with a varchar(16) data type, date_of_registration with date data type, firstname with varchar(20) data type, lastname with varchar(20) data type, patronymic with varchar(20) data type, sex with varchar(1) data type, birthday with date data type.

    The second table is called users_type and consists of id_user_type with data type integer(11) which is the inner key, id_user with data type integer(11) which is the foreign key of the user table, and id_type with data type integer(11) which is the outer key. the key of this table.

    The third table is called type_of_users and consists of the id_type data type integer(11), which is the primary key of the users_type and type_name table, with data type varchar(25).

    The fourth table is called users_work, which consists of id_users_work with an integer(11) data type, id_user, an integer(11) data type, which is the foreign key of the user table, and id_work, with an integer(11) data type, which is the foreign key of the users_work table.

    The fifth table is called user_information, which consists of id_user_info with data type integer(11), information_about_user with data type varchar(150), hobby with data type varchar(100), id_state with data type integer(11), which is the foreign key of the users_information table, id_types with data type integer(11), which is the foreign key of the users_information table, id_city with an integer(11) data type that is the foreign key of the users_information table, id_street with an integer(11) data type that is the foreign key of the users_information table, id_user of the integer(11) data type that is a foreign key from the user table, and house_number with a varchar(10) data type.

    The sixth table is called users_education and consists of id_users_education of the integer(11) data type, id_user, with the integer(11) data type being the foreign key of the users_education table, and id_education of the integer(11) data type being the foreign key.

    The seventh table is called education and consists of the university varchar(100) data type, specialty varchar(100) data type, faculty varchar(50) data type, start_date date data type, end_date date data type, grade_level varchar(100) data type, and id_education integer(11) data type, which is a primary key from the users_education table .

    The eighth table is called work and consists of id_work of the integer(11) data type, which is the foreign key, place with the varchar(200) data type, position with the varchar(100) data type, start_date with the date data type, and end_date with the date data type.

    The ninth table is called state and consists of id_state of the integer(11) data type, which is the primary key, and name_state of the varchar(25) data type.

    The tenth table is called city and consists of id_city of the integer(11) data type, which is the primary key, id_state of the integer(11) data type, which is the foreign key, id_types of the integer(11) data type, which is the foreign key, and name_city of the varchar(25) data type.

    The eleventh table is called types_of_settlements and consists of id_types of the integer(11) data type, which is the primary key, and name_types of the varchar(25) data type.

    The twelfth table is called street and consists of id_street of the integer(11) data type, which is the primary key, id_city of the integer(11) data type, which is the foreign key and name_street of the varchar(40) data type.
    
