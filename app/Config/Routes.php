<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->setAutoRoute(1);
$routes->get('/', 'Home::index');
$routes->get('/Index.php', 'Home::index');
$routes->get('/Kvkkc321.php', 'kvkkc321::Kvkkc321');
$routes->get('/Login.php', 'login::Login');
$routes->get('/Voyage.php', 'voyage::Voyage');
$routes->get('/Tickets.php', 'tickets::Tickets');
$routes->get('/Register.php', 'register::Register');
$routes->get('/TicketPrice.php', 'ticketprice::TicketPrice');
$routes->get('/TicketSalesPoints.php', 'ticketsalespoints::TicketSalesPoints');
$routes->get('/VoyageTime.php', 'voyageTime::VoyageTime');
$routes->get('/WhereIsMyBus.php', 'whereismybus::WhereIsMyBus');
