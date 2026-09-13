--
-- PostgreSQL database dump
--

\restrict yDbLhLlgt6QUvUt8Kk9DXBGlWrLejveqIhxETGEVPbuKdqk4ktKApMHIbNDLBf8

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.4

-- Started on 2026-09-12 11:02:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16489)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 4498 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 863 (class 1247 OID 16501)
-- Name: users_role_enum; Type: TYPE; Schema: public; Owner: avnadmin
--

CREATE TYPE public.users_role_enum AS ENUM (
    'Administrador',
    'Atendente',
    'Médico',
    'Paciente'
);


ALTER TYPE public.users_role_enum OWNER TO avnadmin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16509)
-- Name: users; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(150) NOT NULL,
    email character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    role public.users_role_enum DEFAULT 'Atendente'::public.users_role_enum NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO avnadmin;

--
-- TOC entry 4343 (class 2606 OID 16524)
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- TOC entry 4345 (class 2606 OID 16526)
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


-- Completed on 2026-09-12 11:02:57

--
-- PostgreSQL database dump complete
--

\unrestrict yDbLhLlgt6QUvUt8Kk9DXBGlWrLejveqIhxETGEVPbuKdqk4ktKApMHIbNDLBf8

