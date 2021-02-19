package com.revature.web;

import java.sql.*;

public class CreateConnection {
	private static Connection conn;
	static {
		try {
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection("jdbc:postgresql://localhost/bankapp", "postgres", "password");
		}catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}
	
	}
		
	public static Connection getConnection() {
		return conn;
	}
}
