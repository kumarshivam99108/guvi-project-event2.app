package com.eventmanagement.model;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Ticket {
    private int ticketId;
    private int eventId;
    private String ticketType;
    private BigDecimal price;
    private int quantity;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    // Constructors
    public Ticket() {}

    public Ticket(int eventId, String ticketType, BigDecimal price, int quantity) {
        this.eventId = eventId;
        this.ticketType = ticketType;
        this.price = price;
        this.quantity = quantity;
    }

    // Getters and Setters
    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public String getTicketType() {
        return ticketType;
    }

    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}
