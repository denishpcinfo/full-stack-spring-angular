package com.back.d3n15tecback.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "usuario")
@ToString(exclude = {"password", "token"})
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique=true, nullable=false)
    private Long id;

//    @OneToOne(cascade = CascadeType.MERGE)
//    @JoinColumn(name = "foto")
//    private Anexo foto;

    @Column(name = "username", unique = true, nullable = false, length = 100)
    @Email
    private String username;

//    @Column(unique = true, nullable = false)
//    private String cpfCnpj;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

//    @Enumerated(EnumType.STRING)
//    @Column(name = "perfil", nullable = false)
//    private Perfil perfil;
//
//    private String telefoneCelular;
//
//    private String facebook;
//
//    private String instagram;
//
//    private LocalDateTime dataNascimento;
//
    @Column(name = "create_time", nullable = false)
    private LocalDateTime createTime;
//
//    @Column(name = "modify_time", nullable = false)
//    private LocalDateTime modifyTime;

    @Transient
    private String token;
}