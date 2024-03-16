<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->setAutoRoute(1);
$routes->get('/', 'Home::index');
$routes->get('/Index.php', 'Home::index');
$routes->get('/', 'Kvk::Kvkkc321');
$routes->get('/', 'Login::Login');
$routes->get('/Register.php', 'Kayit::Register');
$routes->get('/', 'TicketPrice::TicketPrice');
$routes->get('/', 'TicketSalesPoints::TicketSalesPoints');
$routes->get('/', 'VoyageTime::VoyageTime');
$routes->get('/', 'WhereIsMyBus::WhereIsMyBus');
