	package com.erms.model;
	import com.fasterxml.jackson.annotation.JsonManagedReference;
	import com.fasterxml.jackson.annotation.JsonBackReference;
	
	import com.erms.auth.model.AppUser;
	
	import jakarta.persistence.*;
	import lombok.Data;
	import lombok.NoArgsConstructor;
	
	@Entity
	@Table(name = "customers")
	@Data
	@NoArgsConstructor
	public class Customer {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	
	    private String name;
	
	    @Column(unique = false)
	    private String email;
	
	    private String phone;
	
	    private String address;
	    
	    @OneToOne
	    @JoinColumn(name = "user_id")
	    @JsonManagedReference
	    private AppUser user;
	    
	
	}
