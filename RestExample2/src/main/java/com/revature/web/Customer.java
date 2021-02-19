package com.revature.web;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Customer {
	private String username;
	private String password;
	private String firstname;
	private String lastname;
	private int id;
	
	Connection conn = CreateConnection.getConnection();
	
	public Customer() {
		super();
	}


	public Customer(String username, String password) {
		super();
		this.username = username;
		this.password = password;
		try{
			retrieveCustomerName();
			retrieveId();
		}catch (SQLException e) {
			System.out.println("An error has occured.");
		}
	}
	
	
	public Customer(String username, String password, String firstname, String lastname) {
		super();
		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		try {
			retrieveId();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public String getFirstname() {
		return firstname;
	}

	public String getLastname() {
		return lastname;
	}
	public int getid() {
		return id;
	}

	public String getUsername() {
		return username;
	}


	public String getPassword() {
		return password;
	}


	public void retrieveCustomerName() throws SQLException{
		CallableStatement cstmt=conn.prepareCall("Call retrieve_customer_name(?,?,?)");
		cstmt.setString(1, username);
		cstmt.setString(2, null);
		cstmt.setString(3, null);
		cstmt.registerOutParameter(2, java.sql.Types.VARCHAR);
		cstmt.registerOutParameter(3, java.sql.Types.VARCHAR);
		cstmt.execute();
		firstname = cstmt.getString(2);
		lastname = cstmt.getString(3);
	}
	
	public void retrieveId() throws SQLException{
		CallableStatement cstmt=conn.prepareCall("Call retrieve_id(?,?)");
		cstmt.setString(1, username);
		cstmt.setInt(2, -1);
		cstmt.registerOutParameter(2, java.sql.Types.INTEGER);
		cstmt.execute();
		id = cstmt.getInt(2);
	}

	public Account[] viewAccounts() throws SQLException{
		Account[] accList = new Account[50];
		PreparedStatement statement = conn.prepareStatement("SELECT accnum, balance, status FROM account WHERE cid = (SELECT cid FROM customer WHERE username = ?)");
		statement.setString(1, username);
		
		ResultSet rs = statement.executeQuery();
		int i = 0;
        while (rs.next()) {
        		accList[i] = new Account(rs.getInt(1));
        		i++;
        	

        }
        List<Account> values = new ArrayList<Account>();
        for(Account data: accList) {
           if(data != null) { 
              values.add(data);
           }
        }
        Account[] target = values.toArray(new Account[values.size()]);
        return target;
        
      
	}
	
	public Account[] viewAcceptedAccounts() throws SQLException{
		Account[] accList = new Account[50];
		PreparedStatement statement = conn.prepareStatement("SELECT accnum, balance, status FROM account WHERE cid = (SELECT cid FROM customer WHERE username = ?)");
		statement.setString(1, username);
		
		ResultSet rs = statement.executeQuery();
		int i = 0;
        while (rs.next()) {
        	if (rs.getInt(3) == 1) {
        		accList[i] = new Account(rs.getInt(1));
        		i++;
        	}

        }
        List<Account> values = new ArrayList<Account>();
        for(Account data: accList) {
           if(data != null) { 
              values.add(data);
           }
        }
        Account[] target = values.toArray(new Account[values.size()]);
        return target;
        
      
	}
	
	public void applyAccount(double startBalance) throws SQLException{
		//newly applied accounts start with a status of 0, meaning it is waiting for an employee to either accept or reject the account
		CallableStatement cstmt=conn.prepareCall("CALL apply_account(?,?)");
		cstmt.setString(1, username);
		cstmt.setDouble(2, startBalance);
		cstmt.execute();
		
		
	}
	
	public int register(String username, String password, String firstname, String lastname) throws SQLException{
		//first check to see if its an unused username
		CallableStatement cstmt=conn.prepareCall("CALL register_user(?,?,?,?,?)");
		cstmt.setString(1, username);
		cstmt.setString(2, password);
		cstmt.setString(3, firstname);
		cstmt.setString(4, lastname);
		cstmt.setInt(5, -1);
		cstmt.registerOutParameter(5, java.sql.Types.INTEGER);
		cstmt.execute();
		int status = cstmt.getInt(5);
		
		return status;
		//status 0 = not made, status 1 = made
		
	}
	
	public int login(String username, String password) throws SQLException{
		//first check to see if its a valid username and password
		CallableStatement cstmt=conn.prepareCall("CALL check_valid_login(?,?,?)");
		cstmt.setString(1, username);
		cstmt.setString(2, password);
		cstmt.setInt(3, -1);
		cstmt.registerOutParameter(3, java.sql.Types.INTEGER);
		cstmt.execute();
		int status = cstmt.getInt(3);
		
		return status;
		//status 0 = not valid, 1 = valid customer, 2 = valid employee
	}
}