package com.eventmanagement.dao;

import com.eventmanagement.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.SQLException;

public abstract class BaseDAO {
    protected Connection getConnection() throws SQLException {
        return DatabaseConnection.getConnection();
    }

    protected void closeConnection() {
        DatabaseConnection.closeConnection();
    }
}
