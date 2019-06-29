package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import nl.hu.v1wac.firstapp.webservices.Country;

public class CountryPostgresDaoImpl extends PostgresBaseDao implements CountryDao {
	
	private List<Country> selectCountry(String qry) {
		List<Country> results = new ArrayList<Country>();
	    
	    try (Connection con = super.getConnection()) {
	      PreparedStatement pstmt = con.prepareStatement(qry);
	      ResultSet dbResultSet = pstmt.executeQuery();
	      
	      while (dbResultSet.next()) {
	        String code = dbResultSet.getString("code");
	        String iso3 = dbResultSet.getString("iso3");
	        String name = dbResultSet.getString("name");
	        String capital = dbResultSet.getString("capital");
	        String region = dbResultSet.getString("region");
	        double surfaceArea = dbResultSet.getDouble("surfacearea");
	        int population = dbResultSet.getInt("population");
	        
	        Country newCountry = new Country(code, iso3, name, capital, region, surfaceArea, population);
	        results.add(newCountry);
	      }
	    } catch (SQLException sqle) { 
	    	sqle.printStackTrace(); 
	    	}
	    return results;
	  }
	public List<Country> findAll() {
		return selectCountry("Select * from country"); 
	}
	
	public Country findByCode(String code) {
		List<Country> rs = selectCountry("select * from country where code = '" + code + "'");//.get(0);
		
		if (rs.isEmpty()) {
			return null;
		} else return rs.get(0);
	}
	
	public List<Country> find10LargestPopulations() {
		return selectCountry("select * from country order by population desc limit 10");
	}
	
	public List<Country> find10LargestSurfaces(){
		return selectCountry("select * from country order by surfacearea desc limit 10");
	}
	
	public boolean update(Country country) throws SQLException {
		String strQuery = "update country set name=?, capital=?, region=?, surfacearea=?, population=?  where code=?";
		PreparedStatement pstmt = getConnection().prepareStatement(strQuery);
		pstmt.setString(1, country.getName());
		pstmt.setString(2, country.getCapital());
		pstmt.setString(3, country.getRegion());
		pstmt.setDouble(4, country.getSurface());
		pstmt.setInt(5, country.getPopulation());
		pstmt.setString(6, country.getCode());
		
		boolean result = false;
		int i = pstmt.executeUpdate();
		if(i > 0) {
			result = true;
		}
		return result;
		
	}
	public boolean delete(Country country) throws SQLException {
		String strQuery = "delete from country where code=?";
		PreparedStatement pstmt = getConnection().prepareStatement(strQuery);
		pstmt.setString(1, country.getCode());
		
		boolean result = false;
		int i = pstmt.executeUpdate();
		if(i > 0) {
			result = true;
		}
		return result;
	}
	
	public boolean add(Country country) throws SQLException {
		String strQuery = "insert into country (code, iso3, name, capital, region, surfacearea, population) values (?,?,?,?,?,?,?)";
		PreparedStatement pstmt = getConnection().prepareStatement(strQuery);
		pstmt.setString(1, country.getCode());
		pstmt.setString(2, country.getIso3());
		pstmt.setString(3, country.getName());
		pstmt.setString(4, country.getCapital());
		pstmt.setString(5, country.getRegion());
		pstmt.setDouble(6, country.getSurface());
		pstmt.setInt(7, country.getPopulation());
		
		boolean result = false;
		int i = pstmt.executeUpdate();
		if(i > 0) {
			result = true;
		}
		return result;
	}
	
}
