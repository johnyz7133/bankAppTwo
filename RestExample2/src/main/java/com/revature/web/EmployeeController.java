package com.revature.web;

import java.sql.SQLException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Path("/empController")
public class EmployeeController {
	Employee e;

	@GET
	@Path("/accounts/{uname}/{pwd}/{cuser}")
	@Produces(MediaType.APPLICATION_JSON)
	public String viewValidAccounts(@PathParam("uname") String username, @PathParam("pwd") String password, @PathParam("cuser") String cuser) {
		try {
			e = new Employee(username, password);
			Account[] accList = e.viewCustomer(cuser);
			ObjectMapper mapper = new ObjectMapper();
			return mapper.writeValueAsString(accList);
			
		} catch(SQLException | JsonProcessingException e) {
			return e.getMessage();
		}
		
	}
	
	@GET
	@Path("/empInfo/{uname}/{pwd}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getEmployeeJSON(@PathParam("uname") String username, @PathParam("pwd") String password) {
		e = new Employee(username, password);
		ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.writeValueAsString(e);
		}
		catch(JsonProcessingException e) {
			return e.getMessage();
		}
	}
	
	@GET
	@Path("/viewPending/{uname}/{pwd}")
	@Produces(MediaType.TEXT_PLAIN)
	public String viewPending(@PathParam("uname") String username, @PathParam("pwd") String password) {
		try {
			e = new Employee(username, password);
			String[] temp = e.viewPending();
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
	@Path("/acceptAcc/{uname}/{pwd}/{accnum}")
	@Produces(MediaType.TEXT_PLAIN)
	public String acceptAcc(@PathParam("uname") String username, @PathParam("pwd") String password, @PathParam("accnum") int accnum) {
		try {
			e = new Employee(username, password);
			e.acceptAccount(accnum);
			return "1";
		} catch (SQLException e) {
			return e.getMessage();
		}
	}
	
	@GET
	@Path("/rejectAcc/{uname}/{pwd}/{accnum}")
	@Produces(MediaType.TEXT_PLAIN)
	public String rejectAcc(@PathParam("uname") String username, @PathParam("pwd") String password, @PathParam("accnum") int accnum) {
		try {
			e = new Employee(username, password);
			e.rejectAccount(accnum);
			return "1";
		} catch (SQLException e) {
			return e.getMessage();
		}
	}
	
	@GET
	@Path("/viewTransaction/{uname}/{pwd}")
	@Produces(MediaType.TEXT_PLAIN)
	public String viewTransaction(@PathParam("uname") String username, @PathParam("pwd") String password) {
		try {
			e = new Employee(username, password);
			String[] temp = e.viewTransactionLog();
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
	@Path("/viewTransfer/{uname}/{pwd}")
	@Produces(MediaType.TEXT_PLAIN)
	public String viewTransfer(@PathParam("uname") String username, @PathParam("pwd") String password) {
		try {
			e = new Employee(username, password);
			String[] temp = e.viewTransferLog();
			String temp2 = "";
			for (int i = 0; i < temp.length; i++) {
				temp2 += temp[i] + "|";
			}
			return temp2;
			} catch (SQLException e) {
				return e.getMessage();
			}
	}
}
