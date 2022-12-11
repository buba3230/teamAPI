Communication application..
The database consists of 12 tables.
    The first table is called user where we have id_user with an integer data type which is an primary key and a long string of 11 characters, login with a varchar data type, email with a varchar data type, phone with a varchar data type, password with a varchar data type, date_of_registration with date data type, firstname with varchar data type, lastname with varchar data type, patronymic with varchar data type, sex with varchar data type, birthday with date data type.

    The second table is called users_type, which consists of id_user, which is the foreign key of the user table, and id_type, which is the internal key of this table.

    The third table is called type_of_users, which consists of id_type, which is the primary key of the users_type and type_name table, with data type varchar .

    The fourth table is called users_work, which consists of id_users_work with an int data type, id_user, an integer data type, which is the foreign key of the user table, and id_work, with an integer data type, which is the foreign key of the users_work table.

    The fifth table is called user_information, which consists of id_user_info with data type integer, information_about_user with data type varchar, hobby with data type varchar, id_state with data type integer, which is the foreign key of the users_information table, id_types with data type integer, which is the foreign key of the users_information table, id_city with an integer data type that is the foreign key of the users_information table, id_street with an integer data type that is the foreign key of the users_information table, id_user of the integer data type that is a foreign key from the user table, and house_number with a varchar data type.

    The sixth table is called users_education and consists of id_users_education of the integer data type, id_user, with the integer data type being the foreign key of the users_education table, and id_education of the integer data type being the foreign key.

    The seventh table is called education and consists of the university varchar data type, specialty varchar data type, faculty varchar data type, start_date date data type, end_date date data type, grade_level varchar data type, and id_education varchar data type, which is a primary key from the users_education table .

    The eighth table is called work and consists of id_work of the integer data type, which is the foreign key, place with the varchar data type, position with the varchar data type, start_date with the date data type, and end_date with the date data type.

    The ninth table is called state and consists of id_state of the integer data type, which is the internal key, and name_state of the varchar data type.

    The tenth table is called city and consists of id_city of the integer data type, which is the primary key, id_state of the integer data type, which is the foreign key, id_types of the integer data type, which is the foreign key, and name_city of the varchar data type.

    The eleventh table is called types_of_settlements and consists of id_types of the integer data type, which is the internal key, and name_types of the varchar data type.

    The twelfth table is called street and consists of id_street of the integer data type, which is the internal key, and name_street of the varchar data type.







