package com.erms.config;

import com.erms.auth.model.AppUser;
import com.erms.auth.repo.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class DbUserDetailsService implements UserDetailsService {
  private final UserRepository userRepo;
  public DbUserDetailsService(UserRepository userRepo) { this.userRepo = userRepo; }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    AppUser u = userRepo.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    var authorities = u.getRoles().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    return new org.springframework.security.core.userdetails.User(u.getUsername(), u.getPassword(), authorities);
  }
}
