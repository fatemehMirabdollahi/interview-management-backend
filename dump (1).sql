--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: add; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.add
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.add OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: interview; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interview (
    interviewyear integer NOT NULL,
    dates character varying(15)[],
    interviewlength integer DEFAULT 30,
    rest integer,
    starttime character varying(5),
    endtime character varying(5),
    gapstart character varying(5),
    gapend character varying(5),
    interviewnumber integer
);


ALTER TABLE public.interview OWNER TO postgres;

--
-- Name: meet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meet (
    interviewyear integer NOT NULL,
    docnumber integer NOT NULL,
    date character varying(10),
    starttime character varying(15),
    endtime character varying(15)
);


ALTER TABLE public.meet OWNER TO postgres;

--
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    docnumber integer NOT NULL,
    condidatenumber character varying(100),
    examyear character varying(100),
    field character varying(100),
    chosenfields character varying(100),
    fieldgroup character varying(100),
    lastname character varying(100),
    studentname character varying(100),
    fathername character varying(100),
    gender character varying(100),
    birthdate character varying(100),
    idnumber character varying(100),
    birthcer character varying(100),
    nid character varying(100),
    unic character varying(100),
    religion character varying(100),
    dutystate character varying(100),
    birthcity character varying(100),
    city character varying(100),
    citycer character varying(100),
    bachunitype character varying(100),
    bacheloruni character varying(100),
    bachelorfield character varying(100),
    masteruni character varying(100),
    masterfield character varying(100),
    thesistitle character varying(100),
    mastersupervisorname character varying(100),
    diplomagrade character varying(100),
    writtendiplomagrade character varying(100),
    bachelorgrade character varying(100),
    sixthsemgrade character varying(100),
    seventhsemgrade character varying(100),
    gradewithoutthesis character varying(100),
    gradewiththesss character varying(100),
    mastergrade character varying(100),
    bachelordate character varying(100),
    masterdate character varying(100),
    employmentstatus character varying(100),
    audyear character varying(100),
    audmonth character varying(100),
    quota character varying(100),
    homenumber character varying(100),
    emergencynumber character varying(100),
    phonenumber character varying(100),
    email character varying(100),
    homeaddress character varying(100),
    paid character varying(100),
    evnumber character varying(100),
    imagesent character varying(100),
    completedoc character varying(100),
    sacrifise character varying(100),
    ahadiprize character varying(100),
    talent boolean,
    interviewyear integer NOT NULL,
    selected boolean DEFAULT false
);


ALTER TABLE public.student OWNER TO postgres;

--
-- Name: interview interview_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interview
    ADD CONSTRAINT interview_pkey PRIMARY KEY (interviewyear);


--
-- Name: meet meet_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meet
    ADD CONSTRAINT meet_id PRIMARY KEY (interviewyear, docnumber);


--
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (docnumber);


--
-- Name: student fk_interview; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT fk_interview FOREIGN KEY (interviewyear) REFERENCES public.interview(interviewyear) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: meet meet_docnumber_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meet
    ADD CONSTRAINT meet_docnumber_fkey FOREIGN KEY (docnumber) REFERENCES public.student(docnumber);


--
-- Name: meet meet_interviewyear_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meet
    ADD CONSTRAINT meet_interviewyear_fkey FOREIGN KEY (interviewyear) REFERENCES public.interview(interviewyear);


--
-- PostgreSQL database dump complete
--

