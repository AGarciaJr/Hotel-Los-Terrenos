package com.vpalz.hotellosterrenos.service.interfaces;

import com.vpalz.hotellosterrenos.dao.Response;
import com.vpalz.hotellosterrenos.entity.Corporation;

public interface ICorporationService {
    Response createCorporation(Corporation corporation);
    Response getAllCorporations();
    Response getCorporationById(String id);
}