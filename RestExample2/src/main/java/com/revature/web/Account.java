package com.revature.web;


import java.sql.*;
import java.util.ArrayList;
import java.util.List;
public class Account {
	private int accnum;
	private double balance;
	private int status;
	private int cid;
	
	
	
	Connection conn = CreateConnection.getConnection();
	
	public Account() {
		super();
	}
	public Account(int accnum) {
		super();
		this.accnum = accnum;
		try {
			retrieveAccountInfo();
			retrieveCid();
		} catch (SQLException e) {
			System.out.println("An error has occured.");
		}
	}
	public Account(int accnum, double balance, int status) {
		super();
		this.accnum = accnum;
		this.balance = balance;
		this.status = status;
		try {
			retrieveCid();
		} catch (SQLException e) {
			System.out.println("An error has occured.");
		}
	}
	
	public int getStatus() {
		return status;
	}
	public int getcid() {
		return cid;
	}	
	public int getAccnum() {
		return accnum;
	}
	public double getBalance() {
		return balance;
	}
	public void retrieveAccountInfo() throws SQLException{
		CallableStatement cstmt=conn.prepareCall("Call retrieve_account_info(?,?,?)");
		cstmt.setInt(1, accnum);
		cstmt.setDouble(2, -1);
		cstmt.setInt(3, -1);
		cstmt.registerOutParameter(2, java.sql.Types.DOUBLE);
		cstmt.registerOutParameter(3, java.sql.Types.INTEGER);
		cstmt.execute();
		balance = cstmt.getDouble(2);
		status = cstmt.getInt(3);
	}
	
	public void retrieveCid() throws SQLException{
		CallableStatement cstmt=conn.prepareCall("Call retrieve_cid(?,?)");
		cstmt.setInt(1, accnum);
		cstmt.setInt(2, -1);
		cstmt.registerOutParameter(2, java.sql.Types.INTEGER);
		cstmt.execute();
		cid = cstmt.getInt(2);
	}
	
	public double viewBalance() throws SQLException{
		CallableStatement cstmt=conn.prepareCall("CALL view_balance(?,?)");
		cstmt.setInt(1, accnum);
		cstmt.setDouble(2, -1);
		cstmt.registerOutParameter(2, java.sql.Types.DOUBLE);
		cstmt.execute();
		double viewBalance = cstmt.getDouble(2);
		return viewBalance;
	}
	
	public int deposit(double amount) throws SQLException{
		CallableStatement cstmt=conn.prepareCall("CALL deposit(?,?,?)");
		cstmt.setDouble(1, amount);
		cstmt.setInt(2, accnum);
		cstmt.setInt(3, -1);
		cstmt.registerOutParameter(3, java.sql.Types.INTEGER);
		cstmt.execute();
		int status = cstmt.getInt(3);
		//status = 0 means deposit failed, 1 = successful
	
		return status;
	}
	
	public int withdraw(double amount) throws SQLException{
		CallableStatement cstmt=conn.prepareCall("CALL withdraw(?,?,?)");
		cstmt.setDouble(1, amount);
		cstmt.setInt(2, accnum);
		cstmt.setInt(3, -1);
		cstmt.registerOutParameter(3, java.sql.Types.INTEGER);
		cstmt.execute();
		int status = cstmt.getInt(3);
		//status = 0 means withdraw failed, 1 = successful
		if (status == 0) {
			System.out.println("Withdrawal failed. Please enter a valid amount.");
		}
		else if (status == 1) {
			System.out.println("Withdrawal complete.");
		}
		
		return status;
	}
	
	public String[] viewPostedTransfers() throws SQLException{
		PreparedStatement statement = conn.prepareStatement("SELECT receive_accnum, amount, status FROM money_transfer WHERE post_accnum = ?");
		statement.setInt(1, accnum);
		ResultSet rs = statement.executeQuery();
		String[] returnStrings = new String[50];
		String temp = "";
		int i = 0;
        while (rs.next()) {
        	if (rs.getInt(3) == 0) {
        		temp = "Transfer to account number: " + rs.getInt(1) + ", Amount: $" + rs.getDouble(2) + ", Status: PENDING";
        		returnStrings[i] = temp;
        		i++;
        	}
        	else if (rs.getInt(3) == 1) {
        		temp = "Transfer to account number: " + rs.getInt(1) + ", Amount: $" + rs.getDouble(2) + ", Status: ACCEPTED";
        		returnStrings[i] = temp;
        		i++;
        	}
        	else if (rs.getInt(3) == 2) {
        		temp = "Transfer to account number: " + rs.getInt(1) + ", Amount: $" + rs.getDouble(2) + ", Status: REJECTED";
    			returnStrings[i] = temp;
    			i++;
        	}
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
	
	public String[] viewAcceptableTransfers() throws SQLException{
		System.out.println("List of pending transfers:");
		PreparedStatement statement = conn.prepareStatement("SELECT tid, post_accnum, amount FROM money_transfer WHERE receive_accnum = ? AND status = 0");
		statement.setInt(1, accnum);
		ResultSet rs = statement.executeQuery();
		String[] returnStrings = new String[50];
		String temp = "";
		int i = 0;
        while (rs.next()) {
        		temp = "Transfer ID: " + rs.getInt(1) + ", Account: " + rs.getInt(2) + ", Amount: $" + rs.getDouble(3);
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
	
	public int postTransfer(double amount, int receivingAcc) throws SQLException{
		CallableStatement cstmt=conn.prepareCall("CALL post_transfer(?,?,?,?)");
		cstmt.setInt(1, accnum);
		cstmt.setInt(2, receivingAcc);
		cstmt.setDouble(3, amount);
		cstmt.setInt(4, -1);
		cstmt.registerOutParameter(4, java.sql.Types.INTEGER);
		cstmt.execute();
		int check = cstmt.getInt(4);
		
		return check;
		//1 = succesful, 0 = failed
		
	
	}
	
	public int acceptTransfer(int transferid) throws SQLException{
		CallableStatement cstmt=conn.prepareCall("CALL accept_transfer(?,?)");
		cstmt.setInt(1, transferid);
		cstmt.setInt(2, -1);
		cstmt.registerOutParameter(2, java.sql.Types.INTEGER);
		cstmt.execute();
		int check = cstmt.getInt(2);
		return check;
		//1 = success, 0 = fail
		
		
	}
	
	public int rejectTransfer(int transferid) throws SQLException{
		CallableStatement cstmt=conn.prepareCall("CALL reject_transfer(?,?)");
		cstmt.setInt(1, transferid);
		cstmt.setInt(2, -1);
		cstmt.registerOutParameter(2, java.sql.Types.INTEGER);
		cstmt.execute();
		int check = cstmt.getInt(2);
		return check;
		//1 = success, 0 = fail
	
	}
	
}
