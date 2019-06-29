package nl.hu.v1wac.firstapp.webservices;

public class Country {
	private String code;
	private String iso3;
	private String name;
	private String capital;
	private String continent;
	private String region;
	private double surface;
	private int population;
	private String government;
	private double latitude;
	private double longitude;
	
	public Country(String code, String iso3, String nm, String cap, String ct, String reg, double sur, int pop, String gov, double lat, double lng) {
		this.code = code; 
		this.iso3 = iso3;
		this.name = nm;
		this.capital = cap;
		this.continent = ct;
		this.region = reg;
		this.surface = sur;
		this.population = pop;
		this.government = gov;
		this.latitude = lat;
		this.longitude = lng;
	}
	
	public Country(String cd, String iso32, String nm, String hs, String reg, double opp, int inw) {
		this.code = cd; 
		this.iso3 = iso32;
		this.name = nm;
		this.capital = hs;
		
		this.region = reg;
		this.surface = opp;
		this.population = inw;
		
		
		// TODO Auto-generated constructor stub
	}

	public void setCode(String code) {
		this.code = code;
	}

	public void setIso3(String iso3) {
		this.iso3 = iso3;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setCapital(String capital) {
		this.capital = capital;
	}

	public void setContinent(String continent) {
		this.continent = continent;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public void setSurface(double surface) {
		this.surface = surface;
	}

	public void setPopulation(int population) {
		this.population = population;
	}

	public void setGovernment(String government) {
		this.government = government;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public String getCode() {
		return code;
	}
	
	public String getIso3() {
		return iso3;
	}
	
	public String getName() {
		return name;
	}
	
	public String getCapital() {
		return capital;
	}
	
	public String getContinent() {
		return continent;
	}
	
	public String getRegion() {
		return region;
	}
	
	public double getSurface() {
		return surface;
	}
	
	public int getPopulation() {
		return population;
	}
	
	public String getGovernment() {
		return government;
	}
	
	public double getLatitude() {
		return latitude;
	}
	
	public double getLongitude() {
		return longitude;
	}
}


