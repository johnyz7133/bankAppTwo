package com.revature.web;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Employee{
	private String username;
	private String password;
	private String firstname;
	private String lastname;
	private Customer c;
	
	Connection conn = CreateConnection.getConnection();
	
	public Employee() {
		super();
	}

	public Employee(String username, String password) {
		super();
		this.username = username;
		this.password = password;
		try {
			retrieveEmployeeName();
		}catch (SQLException e) {
			System.out.println("An error has occured.");
		}
	}
	
	public String getFirstname() {
		return firstname;
	}

	public String getLastname() {
		return lastname;
	}


	public void retrieveEmployeeName() throws SQLException{
		CallableStatement cstmt=conn.prepareCall("Call retrieve_employee_name(?,?,?)");
		cstmt.setString(1, username);
		cstmt.setString(2, null);
		cstmt.setString(3, null);
		cstmt.registerOutParameter(2, java.sql.Types.VARCHAR);
		cstmt.registerOutParameter(3, java.sql.Types.VARCHAR);
		cstmt.execute();
		firstname = cstmt.getString(2);
		lastname = cstmt.getString(3);
	}

	
	public Account[] viewCustomer(String cuser) throws SQLException{
		//given the customer's username, create the customer object
		CallableStatement cstmt=conn.prepareCall("CALL retrieve_customer(?,?,?,?,?)");
		cstmt.setString(1, cuser);
		cstmt.setInt(2, -1);
		cstmt.setString(3, null);
		cstmt.setString(4, null);
		cstmt.setString(5, null);
		cstmt.registerOutParameter(2, java.sql.Types.INTEGER);
		cstmt.registerOutParameter(3, java.sql.Types.VARCHAR);
		cstmt.registerOutParameter(4, java.sql.Types.VARCHAR);
		cstmt.registerOutParameter(5, java.sql.Types.VARCHAR);
		cstmt.execute();
		c = new Customer(cuser, cstmt.getString(3), cstmt.getString(4), cstmt.getString(5));
		Account[] accList = c.viewAccounts();
		return accList;
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

	public void viewAccount(int accnum){
		//given a customer's account number, the employee can only view its balance (no deposit or withdraw)
		try {
			CallableStatement cstmt=conn.prepareCall("CALL view_balance(?,?");
			cstmt.setInt(1, accnum);
			cstmt.setDouble(2, -1);
			cstmt.registerOutParameter(2, java.sql.Types.DOUBLE);
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	
	public String[] viewPending() throws SQLException{
		System.out.println("List of pending accounts:");
		PreparedStatement statement = conn.prepareStatement("SELECT accnum, status FROM account WHERE status = 0");	
		ResultSet rs = statement.executeQuery();
		String[] returnStrings = new String[50];
		String temp = "";
		int i = 0;
        while (rs.next()) {
        	temp = "Account Number: " + rs.getInt(1);
        	returnStrings[i] = temp;
        	i++;
        }
        
        List<String> values = new ArrayList<String>();
        for(String data: returnStrings) {
           if(data != null) { 
              values.add(data);
           }
        }
        String[] target = values.toArray(new String[values.size()]);
        return target;
	}
	
	public void acceptAccount(int accnum) throws SQLException{
		CallableStatement cstmt=conn.prepareCall("CALL accept_account(?)");
		cstmt.setInt(1, accnum);
		cstmt.execute();
	}
	
	public void rejectAccount(int accnum) throws SQLException{
		CallableStatement cstmt=conn.prepareCall("CALL reject_account(?)");
		cstmt.setInt(1, accnum);
		cstmt.execute();
	}
	
	public String[] viewTransactionLog() throws SQLException{
		PreparedStatement statement = conn.prepareStatement("select * FROM transaction_history");
		ResultSet rs = statement.executeQuery();
		String[] returnStrings = new String[50];
		String temp = "";
		int i = 0;
        while (rs.next()) {
        	temp = "Account number: " + rs.getInt(1) + "\tType: " + rs.getString(2) + "\tAmount: " + rs.getDouble(3) + "\tDate: " + rs.getDate(4);
        	returnStrings[i] = temp;
        	i++;
        }
        List<String> values = new ArrayList<String>();
        for(String data: returnStrings) {
           if(data != null) { 
              values.add(data);
           }
        }
        String[] target = values.toArray(new String[values.size()]);
        return target;
	}
	
	public String[] viewTransferLog() throws SQLException{
		PreparedStatement statement = conn.prepareStatement("select * FROM transfer_history");
		ResultSet rs = statement.executeQuery();
		String[] returnStrings = new String[50];
		String temp = "";
		int i = 0;
        while (rs.next()) {
        	temp = "Poster account number: " + rs.getInt(1) + "\tReceiver account number: " + rs.getInt(2)  + "\tAmount: " + rs.getDouble(3) + "\tType: " + rs.getString(4) + "\tDate: " + rs.getDate(5);
        	returnStrings[i] = temp;
        	i++;
        }
        List<String> values = new ArrayList<String>();
        for(String data: returnStrings) {
           if(data != null) { 
              values.add(data);
           }
        }
        String[] target = values.toArray(new String[values.size()]);
        return target;
	}
	


	

}