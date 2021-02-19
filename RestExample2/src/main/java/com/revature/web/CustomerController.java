package com.revature.web;

import java.math.BigDecimal;
import java.sql.SQLException;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Path("/custController")
@JsonInclude(Include.NON_NULL)
public class CustomerController {
	Customer c = new Customer();
	@GET
	@Path("/createCustomer/{fname}/{lname}/{uname}/{pwd}")
	@Produces(MediaType.TEXT_PLAIN)
	//@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String CreateCustomer(@PathParam("uname") String username, @PathParam("pwd") String password, @PathParam("fname") String firstname, @PathParam("lname") String lastname) {
		int status;
		try {
			status = c.register(username, password, firstname, lastname);
			
			String statusString = String.valueOf(status);
			return statusString;
			/*if (status == 0) 
				return "Customer registration failed";
			else if (status == 1) {
				c = new Customer(username, password, firstname, lastname);
				return "Customer registration success";
			}
			else
				return "Error has occured";*/
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			return e.getMessage();
		}
	}
	
	
	@GET
	@Path("/login/{uname}/{pwd}")
	@Produces(MediaType.TEXT_PLAIN)
	public String login(@PathParam("uname") String username, @PathParam("pwd") String password) {
		int status;
		try {
			status = c.login(username, password);
			String statusString = String.valueOf(status);
			return statusString;
		} catch (SQLException e) {
			return e.getMessage();
		}
	}
	
	@GET
	@Path("/customerInfo/{uname}/{pwd}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getCustomerJSON(@PathParam("uname") String username, @PathParam("pwd") String password) {
		c = new Customer(username, password);
		ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.writeValueAsString(c);
		}
		catch(JsonProcessingException e) {
			return e.getMessage();
		}
		
	}
	
	@GET
	@Path("/applyAccount/{uname}/{pwd}/{balance}")
	@Produces(MediaType.TEXT_PLAIN)
	public String applyAccount(@PathParam("uname") String username, @PathParam("pwd") String password, @PathParam("balance") double amount) {
		int status;
		c = new Customer(username, password);
		if (amount > 0 && BigDecimal.valueOf(amount).scale() <= 2) {
			try {
				c.applyAccount(amount);
				status = 1;
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
	@Path("/validAccounts/{uname}/{pwd}")
	@Produces(MediaType.APPLICATION_JSON)
	public String viewValidAccounts(@PathParam("uname") String username, @PathParam("pwd") String password) {
		try {
			c = new Customer(username, password);
			Account[] accList = c.viewAcceptedAccounts();
			ObjectMapper mapper = new ObjectMapper();
			return mapper.writeValueAsString(accList);
		} catch (SQLException | JsonProcessingException e) {
			return e.getMessage();
		}
	}
}
