package com.vpalz.hotellosterrenos.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "corp_sequence")
public class CorporationSequence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long seq;
}
