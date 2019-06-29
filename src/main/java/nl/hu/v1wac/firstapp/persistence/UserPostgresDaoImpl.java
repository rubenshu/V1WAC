package nl.hu.v1wac.firstapp.persistence;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserPostgresDaoImpl extends PostgresBaseDao implements UserDao {
	public String findRoleForUser(String name, String pass) throws SQLException {
		String strQuery = "select role from useraccount where username=? and password=?";
		PreparedStatement pstmt = getConnection().prepareStatement(strQuery);
		pstmt.setString(1, name);
		pstmt.setString(2, pass);
		
		ResultSet rs = pstmt.executeQuery();
		if(!rs.next()) {
			return null;
		}
		return rs.getString(1);
	}
}
