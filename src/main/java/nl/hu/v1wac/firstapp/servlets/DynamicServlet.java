package nl.hu.v1wac.firstapp.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/DynamicServlet.do")
public class DynamicServlet extends HttpServlet {
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String name = req.getParameter("username");
		String button = req.getParameter("button");
		//String Go = req.getParameter("Go!");
		
		double nmr1 = Double.parseDouble(req.getParameter("nummer1"));
		double nmr2 = Double.parseDouble(req.getParameter("nummer2"));
		
		double plus = nmr1 + nmr2;
		double min = nmr1 - nmr2;
		double keer = nmr1 * nmr2;
		double delen = nmr1 / nmr2;
		
		PrintWriter out = resp.getWriter();
		
		resp.setContentType("text/html");
		
		out.println("<!DOCTYPE html>");
		out.println("<html>");
		out.println(" <title>Dynamic Example</title>");
		out.println(" <body>");
		out.println(" <h2>Dynamic webapplication example</h2>");
		out.println("<h2>Hello " + name + "! </h2>");
		
		if("+".equals(button)) {
			out.println("Hello " + name + "!");
			out.println("<h1>" + nmr1 + " + " + nmr2 + " = " + plus + "</h1>");
		}
		else if ("-".equals(button)) {
			out.println(nmr1 + " - " + nmr2 + " = " + min);
		}
		else if ("x".equals(button)) {
			out.println(nmr1 + " x " + nmr2 + " = " + keer);
		}
		else if ("/".equals(button)) {
			out.println(nmr1 + " / " + nmr2 + " = " + delen);
		}
		
		
		out.println(" </body>");
		out.println("</html>");
	}
}