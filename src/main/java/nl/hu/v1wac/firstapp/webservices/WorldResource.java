package nl.hu.v1wac.firstapp.webservices;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

@Path("/countries")
public class WorldResource {

	WorldService service = ServiceProvider.getWorldService();
	
	@GET
	@Produces("application/json")
	public String infoCountries() {
		JsonArrayBuilder jab=Json.createArrayBuilder();
		
		for (Country c: service.getAllCountries()){
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("Code", c.getCode());
			job.add("Iso3", c.getIso3());
			job.add("Name", c.getName());
			job.add("Capital", c.getCapital());
			job.add("Continent", c.getContinent());
			job.add("Region", c.getRegion());
			job.add("Surface", c.getSurface());
			job.add("Population", c.getPopulation());
			job.add("Government", c.getGovernment());
			job.add("Latitude", c.getLatitude());
			job.add("Longitude", c.getLongitude());
			
			jab.add(job);
		}
	return jab.build().toString();
	}
	
	
	@GET
	@Path("{code}")
	public String getCountryByCode(@PathParam("code") String code) {
		return getCountry(service.getCountryByCode(code));
	}
	
	@GET
	@Path("/largestSurface")
	public String getLargestCountries() {
		return getList(service.get10LargestSurfaces());
	}
	
	
	
	@GET
	@Path("/largestPopulation")
	public String getLargestPopulation() {
		return getList(service.get10LargestPopulations());
	}

	public String getList(List<Country> list) {
		JsonArrayBuilder jab = Json.createArrayBuilder();
		for (Country c : list) {
			jab.add(getCountry(c));
		}
		
		JsonArray array = jab.build();
		
		return array.toString();
	}
	
	
	public String getCountry(Country c) {
		
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("Code", c.getCode());
			job.add("Iso3", c.getIso3());
			job.add("Name", c.getName());
			job.add("Capital", c.getCapital());
			job.add("Continent", c.getContinent());
			job.add("Region", c.getRegion());
			job.add("Surface", c.getSurface());
			job.add("Population", c.getPopulation());
			job.add("Government", c.getGovernment());
			job.add("Latitude", c.getLatitude());
			job.add("Longitude", c.getLongitude());
		
		return job.build().toString();
	}
	
	@PUT
	@Path("{code}")
	@RolesAllowed("user")
	@Produces("application/json")
	  public Response updateCountry(@PathParam("code") String code,
					@FormParam("land") String lnd,
					@FormParam("hoofdstad") String hs,
					@FormParam("regio") String reg,
					@FormParam("oppervlakte") double opp,
					@FormParam("inwoners") int inw) throws SQLException {

		Country c1 = service.getCountryByCode(code);
		c1.setName(lnd);
		c1.setCapital(hs);
		c1.setRegion(reg);
		c1.setSurface(opp);
		c1.setPopulation(inw);
	    service.countryDao.update(c1);
	    return Response.ok(c1).build();
	}
//	}
	
	@DELETE
	@Path("{code}")
	@Produces("application/json")
	@RolesAllowed("user")
	public Response deleteCountry(@PathParam("code") String code) throws SQLException {
		Country c1 = service.getCountryByCode(code);
		service.countryDao.delete(c1);
		System.out.println("test");

	    return Response.ok().build();
	}
	
	@POST
	@Produces("application/json")
	@RolesAllowed("user")
	public Response createCountry(@FormParam("voegcode") String cd,
									@FormParam("voegiso3") String iso3,
									@FormParam("voegland") String nm,
									@FormParam("voeghoofdstad") String hs,
									@FormParam("voegregio") String reg,
									@FormParam("voegopp") double opp,
									@FormParam("voeginw") int inw) throws SQLException {
		Country c1 = new Country(cd, iso3, nm, hs, reg, opp, inw);
		
		
		boolean b = service.countryDao.add(c1);
		System.out.println(b);
		return Response.ok(c1).build();
	}
}