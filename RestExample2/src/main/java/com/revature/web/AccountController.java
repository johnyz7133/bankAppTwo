package com.revature.web;

import java.math.BigDecimal;
import java.sql.SQLException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/accController")
public class AccountController {
	Account a;
	
	@GET
	@Path("/viewBalance/{accnum}")
	@Produces(MediaType.TEXT_PLAIN)
	public String viewBalance(@PathParam("accnum") int accnum) {
		try {
			a = new Account(accnum);
			double balance;
			balance = a.viewBalance();

			String textBalance = String.valueOf(balance);
			return textBalance;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			return e.getMessage();
		}
	}
	
	@GET
	@Path("/deposit/{accnum}/{depositAmount}")
	@Produces(MediaType.TEXT_PLAIN)
	public String depositAccount(@PathParam("accnum") int accnum, @PathParam("depositAmount") double amount) {
		int status;
		a = new Account(accnum);
		if (amount > 0 && BigDecimal.valueOf(amount).scale() <= 2) {
			try {
				status = a.deposit(amount);
				String statusString = String.valueOf(status);
				return statusString;
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				return e.getMessage();
			}
		}
		else {
			status = 0;
			String statusString = String.valueOf(status);
			return statusString;
		}
	}
	
	@GET
	@Path("/withdraw/{accnum}/{withdrawAmount}")
	@Produces(MediaType.TEXT_PLAIN)
	public String withdrawAccount(@PathParam("accnum") int accnum, @PathParam("withdrawAmount") double amount) {
		int status;
		a = new Account(accnum);
		if (amount > 0 && BigDecimal.valueOf(amount).scale() <= 2) {
			try {
				status = a.withdraw(amount);
				String statusString = String.valueOf(status);
				return statusString;
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				return e.getMessage();
			}
		}
		else {
			status = 0;
			String statusString = String.valueOf(status);
			return statusString;
		}
	}
	
	@GET
	@Path("/viewPosted/{accnum}")
	@Produces(MediaType.TEXT_PLAIN)
	public String viewPosted(@PathParam("accnum") int accnum) {
		try {
		a = new Account(accnum);
		String[] temp = a.viewPostedTransfers();
		String temp2 = "";
		for (int i = 0; i < temp.length; i++) {
			temp2 += temp[i] + "|";
		}
		return temp2;
		} catch (SQLException e) {
			return e.getMessage();
		}
	}
	
	@GET
	@Path("/viewIncoming/{accnum}")
	@Produces(MediaType.TEXT_PLAIN)
	public String viewIncoming(@PathParam("accnum") int accnum) {
		try {
			a = new Account(accnum);
			String[] temp = a.viewAcceptableTransfers();
			String temp2 = "";
			for (int i = 0; i < temp.length; i++) {
				temp2 += temp[i] + "|";
			}
			return temp2;
			} catch (SQLException e) {
				return e.getMessage();
			}
	}
	
	@GET
	@Path("/postTransfer/{accnum}/{transferAmount}/{receiver}")
	@Produces(MediaType.TEXT_PLAIN)
	public String postTransfer(@PathParam("accnum") int accnum, @PathParam("transferAmount") double amount, @PathParam("receiver") int receiver) {
		try {
			a = new Account(accnum);
			int status;
			status = a.postTransfer(amount, receiver);
			String statusString = String.valueOf(status);
			return statusString;
		} catch (SQLException e) {
			return e.getMessage();
		}
	}
	
	@GET
	@Path("/acceptTransfer/{accnum}/{transferId}")
	@Produces(MediaType.TEXT_PLAIN)
	public String acceptTransfer(@PathParam("accnum") int accnum, @PathParam("transferId") int transferId) {
		try {
			a = new Account(accnum);
			int status;
			status = a.acceptTransfer(transferId);
			String statusString = String.valueOf(status);
			return statusString;
		} catch (SQLException e) {
			return e.getMessage();
		}
	}
	
	@GET
	@Path("/rejectTransfer/{accnum}/{transferId}")
	@Produces(MediaType.TEXT_PLAIN)
	public String rejectTransfer(@PathParam("accnum") int accnum, @PathParam("transferId") int transferId) {
		try {
			a = new Account(accnum);
			int status;
			status = a.rejectTransfer(transferId);
			String statusString = String.valueOf(status);
			return statusString;
		} catch (SQLException e) {
			return e.getMessage();
		}
	}
	
	
}
