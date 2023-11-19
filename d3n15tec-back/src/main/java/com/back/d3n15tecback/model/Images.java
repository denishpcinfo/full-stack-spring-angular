package com.back.d3n15tecback.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "images")
public class Images {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique=true, nullable=false)
    private Long image_id;

    @Column(name = "id")
    private Long id;

    @Column(name = "alt")
    private String alt;

    @Column(name = "src")
    private String src;

    @Column(name = "variant_id")
    @ElementCollection(targetClass=Long.class)
    private List<Long> variant_id;

}
