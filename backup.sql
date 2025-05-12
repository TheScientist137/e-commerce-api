--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: eyepieces; Type: TABLE; Schema: public; Owner: scientist137-user
--

CREATE TABLE public.eyepieces (
    id integer NOT NULL,
    product_id integer NOT NULL,
    eyepiece_type character varying(255)
);


ALTER TABLE public.eyepieces OWNER TO "scientist137-user";

--
-- Name: eyepieces_id_seq; Type: SEQUENCE; Schema: public; Owner: scientist137-user
--

CREATE SEQUENCE public.eyepieces_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.eyepieces_id_seq OWNER TO "scientist137-user";

--
-- Name: eyepieces_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: scientist137-user
--

ALTER SEQUENCE public.eyepieces_id_seq OWNED BY public.eyepieces.id;


--
-- Name: eyepieces_specs; Type: TABLE; Schema: public; Owner: scientist137-user
--

CREATE TABLE public.eyepieces_specs (
    id integer NOT NULL,
    eyepiece_id integer NOT NULL,
    focal_length character varying(255),
    apparent_field_of_view numeric,
    number_of_lenses numeric,
    coating_optical_system character varying(255),
    adjustable_eyepiece_cup character varying(255),
    filter_thread character varying(255),
    series character varying(255),
    weight numeric,
    type character varying(255),
    build_type character varying(255)
);


ALTER TABLE public.eyepieces_specs OWNER TO "scientist137-user";

--
-- Name: eyepieces_specs_id_seq; Type: SEQUENCE; Schema: public; Owner: scientist137-user
--

CREATE SEQUENCE public.eyepieces_specs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.eyepieces_specs_id_seq OWNER TO "scientist137-user";

--
-- Name: eyepieces_specs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: scientist137-user
--

ALTER SEQUENCE public.eyepieces_specs_id_seq OWNED BY public.eyepieces_specs.id;


--
-- Name: filter_specs; Type: TABLE; Schema: public; Owner: scientist137-user
--

CREATE TABLE public.filter_specs (
    id integer NOT NULL,
    filter_id integer NOT NULL,
    connection character varying(255),
    frame character varying(255),
    transmission character varying(255),
    mount_material character varying(255),
    series character varying(255),
    type character varying(255),
    build_type character varying(255)
);


ALTER TABLE public.filter_specs OWNER TO "scientist137-user";

--
-- Name: filter_specs_id_seq; Type: SEQUENCE; Schema: public; Owner: scientist137-user
--

CREATE SEQUENCE public.filter_specs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.filter_specs_id_seq OWNER TO "scientist137-user";

--
-- Name: filter_specs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: scientist137-user
--

ALTER SEQUENCE public.filter_specs_id_seq OWNED BY public.filter_specs.id;


--
-- Name: filters; Type: TABLE; Schema: public; Owner: scientist137-user
--

CREATE TABLE public.filters (
    id integer NOT NULL,
    product_id integer NOT NULL,
    filter_type character varying(255)
);


ALTER TABLE public.filters OWNER TO "scientist137-user";

--
-- Name: filters_id_seq; Type: SEQUENCE; Schema: public; Owner: scientist137-user
--

CREATE SEQUENCE public.filters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.filters_id_seq OWNER TO "scientist137-user";

--
-- Name: filters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: scientist137-user
--

ALTER SEQUENCE public.filters_id_seq OWNED BY public.filters.id;


--
-- Name: mount_specs; Type: TABLE; Schema: public; Owner: scientist137-user
--

CREATE TABLE public.mount_specs (
    id integer NOT NULL,
    mount_id integer NOT NULL,
    max_adding_load_capacity numeric,
    polar_axis_scale character varying(255),
    "GoTo" character varying(255),
    pole_finder character varying(255),
    total_weight numeric,
    type character varying(255),
    build_type character varying(255),
    series character varying(255),
    software character varying(255),
    database numeric,
    "GPS" character varying(255),
    autoguiding character varying(255),
    "WIFI" character varying(255)
);


ALTER TABLE public.mount_specs OWNER TO "scientist137-user";

--
-- Name: mount_specs_id_seq; Type: SEQUENCE; Schema: public; Owner: scientist137-user
--

CREATE SEQUENCE public.mount_specs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mount_specs_id_seq OWNER TO "scientist137-user";

--
-- Name: mount_specs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: scientist137-user
--

ALTER SEQUENCE public.mount_specs_id_seq OWNED BY public.mount_specs.id;


--
-- Name: mounts; Type: TABLE; Schema: public; Owner: scientist137-user
--

CREATE TABLE public.mounts (
    id integer NOT NULL,
    product_id integer NOT NULL,
    mount_type character varying(255)
);


ALTER TABLE public.mounts OWNER TO "scientist137-user";

--
-- Name: mounts_id_seq; Type: SEQUENCE; Schema: public; Owner: scientist137-user
--

CREATE SEQUENCE public.mounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mounts_id_seq OWNER TO "scientist137-user";

--
-- Name: mounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: scientist137-user
--

ALTER SEQUENCE public.mounts_id_seq OWNED BY public.mounts.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: scientist137-user
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    brand character varying(255) NOT NULL,
    image text,
    product_type character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    image_public_id character varying(255)
);


ALTER TABLE public.products OWNER TO "scientist137-user";

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: scientist137-user
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO "scientist137-user";

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: scientist137-user
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: telescope_specs; Type: TABLE; Schema: public; Owner: scientist137-user
--

CREATE TABLE public.telescope_specs (
    id integer NOT NULL,
    type character varying(255),
    optical_design character varying(255),
    aperture numeric,
    focal_length numeric,
    aperture_ratio numeric,
    resolving_capacity numeric,
    limit_value numeric,
    light_gathering_capacity numeric,
    max_useful_magnification numeric,
    mount_type character varying(255),
    mount_build_type character varying(255),
    "GoTo" character varying(255),
    total_weight numeric,
    moon_planets character varying(255),
    nebulae_galaxies character varying(255),
    nature_observation character varying(255),
    astrophotography character varying(255),
    sun character varying(255),
    beginners character varying(255),
    advanced character varying(255),
    observatories character varying(255),
    telescope_id integer NOT NULL
);


ALTER TABLE public.telescope_specs OWNER TO "scientist137-user";

--
-- Name: telescope_specs_id_seq; Type: SEQUENCE; Schema: public; Owner: scientist137-user
--

CREATE SEQUENCE public.telescope_specs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.telescope_specs_id_seq OWNER TO "scientist137-user";

--
-- Name: telescope_specs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: scientist137-user
--

ALTER SEQUENCE public.telescope_specs_id_seq OWNED BY public.telescope_specs.id;


--
-- Name: telescopes; Type: TABLE; Schema: public; Owner: scientist137-user
--

CREATE TABLE public.telescopes (
    id integer NOT NULL,
    product_id integer NOT NULL,
    optical_design character varying(255),
    mount_type character varying(255)
);


ALTER TABLE public.telescopes OWNER TO "scientist137-user";

--
-- Name: telescopes_id_seq; Type: SEQUENCE; Schema: public; Owner: scientist137-user
--

CREATE SEQUENCE public.telescopes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.telescopes_id_seq OWNER TO "scientist137-user";

--
-- Name: telescopes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: scientist137-user
--

ALTER SEQUENCE public.telescopes_id_seq OWNED BY public.telescopes.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: scientist137-user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    hashedpassword character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'user'::character varying NOT NULL,
    cart jsonb DEFAULT '[]'::jsonb NOT NULL
);


ALTER TABLE public.users OWNER TO "scientist137-user";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: scientist137-user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO "scientist137-user";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: scientist137-user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: eyepieces id; Type: DEFAULT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.eyepieces ALTER COLUMN id SET DEFAULT nextval('public.eyepieces_id_seq'::regclass);


--
-- Name: eyepieces_specs id; Type: DEFAULT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.eyepieces_specs ALTER COLUMN id SET DEFAULT nextval('public.eyepieces_specs_id_seq'::regclass);


--
-- Name: filter_specs id; Type: DEFAULT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.filter_specs ALTER COLUMN id SET DEFAULT nextval('public.filter_specs_id_seq'::regclass);


--
-- Name: filters id; Type: DEFAULT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.filters ALTER COLUMN id SET DEFAULT nextval('public.filters_id_seq'::regclass);


--
-- Name: mount_specs id; Type: DEFAULT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.mount_specs ALTER COLUMN id SET DEFAULT nextval('public.mount_specs_id_seq'::regclass);


--
-- Name: mounts id; Type: DEFAULT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.mounts ALTER COLUMN id SET DEFAULT nextval('public.mounts_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: telescope_specs id; Type: DEFAULT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.telescope_specs ALTER COLUMN id SET DEFAULT nextval('public.telescope_specs_id_seq'::regclass);


--
-- Name: telescopes id; Type: DEFAULT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.telescopes ALTER COLUMN id SET DEFAULT nextval('public.telescopes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: eyepieces; Type: TABLE DATA; Schema: public; Owner: scientist137-user
--

COPY public.eyepieces (id, product_id, eyepiece_type) FROM stdin;
1	14	Plossl
2	15	SWA
3	16	UWA
4	17	XWA
5	18	Zoom
6	19	Reticle
\.


--
-- Data for Name: eyepieces_specs; Type: TABLE DATA; Schema: public; Owner: scientist137-user
--

COPY public.eyepieces_specs (id, eyepiece_id, focal_length, apparent_field_of_view, number_of_lenses, coating_optical_system, adjustable_eyepiece_cup, filter_thread, series, weight, type, build_type) FROM stdin;
1	1	32	52	5	Multi Coating	yes	yes	Super Plossl	240	Eyepiece	Super-Plossl
2	2	38	70	5	multiple	yes	yes	SWA	300	Eyepiece	SWA
3	3	6	66	5	multiple	-(folding)	yes	UWA	180	Eyepiece	UWA
4	4	10	100	8	multiple	-(folding)	yes	Panorama II	375	Eyepiece	XWA
5	5	8 (Zoom spans 8-24)	51	4	multiple	yes	yes	Zoom	85	Eyepiece	Zoom eyepiece
6	6	12	50	4	multiple	no	yes	Reticle	117	Eyepiece	Reticle eyepieces
\.


--
-- Data for Name: filter_specs; Type: TABLE DATA; Schema: public; Owner: scientist137-user
--

COPY public.filter_specs (id, filter_id, connection, frame, transmission, mount_material, series, type, build_type) FROM stdin;
1	1	1.25	1.25	30	Aluminium	Basic	Filters	Moon filter
2	2	1.50	1.25	98	Aluminium	L-RGB CMOS	Filters	Luminance
4	4	1.25	lens filters	75	Aluminium	Basic	Solar Filters	white light
3	3	1.25	1.25	75	Aluminium	Advanced	Filters	Broadband Filters
\.


--
-- Data for Name: filters; Type: TABLE DATA; Schema: public; Owner: scientist137-user
--

COPY public.filters (id, product_id, filter_type) FROM stdin;
1	20	moon_filter
2	21	color_filter
3	22	nebulae_filter
4	23	solar_filter
\.


--
-- Data for Name: mount_specs; Type: TABLE DATA; Schema: public; Owner: scientist137-user
--

COPY public.mount_specs (id, mount_id, max_adding_load_capacity, polar_axis_scale, "GoTo", pole_finder, total_weight, type, build_type, series, software, database, "GPS", autoguiding, "WIFI") FROM stdin;
1	1	13	yes	no	no	6	Mount	Azimuthal	Advanced	\N	\N	\N	\N	\N
2	2	5	yes	yes	yes	6.5	Mount	Azimuthal	Star Discovery	SynScan	10000	no	yes	yes
3	3	10	yes	no	yes	5.1	Mount	Equatorial	EQ5		\N	\N	\N	\N
4	4	20	yes	yes	yes	34.8	Mount	Equatorial	EQ6	SynScan	42000	optional	yes	optional
\.


--
-- Data for Name: mounts; Type: TABLE DATA; Schema: public; Owner: scientist137-user
--

COPY public.mounts (id, product_id, mount_type) FROM stdin;
1	10	Azimuthal
2	11	Azimuthal_GoTo
3	12	Equatorial
4	13	Equatorial_GoTo
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: scientist137-user
--

COPY public.products (id, name, description, price, brand, image, product_type, created_at, updated_at, image_public_id) FROM stdin;
4	Telescope N 150/750 EQ-3 	The Omegon 150/750 EQ-3 Newtonian Reflector is an ideal telescope for beginners in astronomy. This telescope features good optics and a very stable mount.	299.00	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746196157/Omegon-Telescope-N-150-750-EQ-3_h4mpnm.jpg	telescope	2025-05-02 16:29:58.250912	2025-05-02 16:29:58.250912	Omegon-Telescope-N-150-750-EQ-3_h4mpnm
5	Maksutov telescope MC 102/1300 Skymax-102S AZ-Pronto 	The MC 102/1300 telescope: This telescope is an ideal companion for trips and is suitable both for astronomy and for use as a reflector spotting scope for nature watching. This telescope is also super for letting children take their first steps in observing the night sky. The extremely compact design fits into virtually any hand luggage and is also known for the very high-contrast image it produces. Its 102mm aperture collects much more light than its 90mm little brother - the light collecting capacity is 212X more than the naked eye alone (for a 7mm exit pupil). Although the overall length is only 28cm, it has a long focal length of 1300mm resulting in an aperture ratio of f12.7.\n\nAstronomically, this telescope has had a lot to offer: with a resolution of 1.13 arc seconds, planets become beautiful objects to observe. Exploring deep sky objects such as the Orion Nebula or the summer Milky Way is also highly enjoyable. This telescope also provides an appropriately low priced alternative as a spotting scope for nature watching. Many classic spotting scopes only start to include adapters for use with a camera at the higher end of the market, at several hundred Euros. This telescope is different: it comes with a large range of adaptations for nature photography included. The 1300mm focal length means that low cost bird photography is possible. The built-in T-2 thread allows the simple connection of an SLR camera. And, for astrophotography, you can also take shots of the Moon for example. The focusing sharpness is set by adjusting a knob on the side which moves the primary mirror forwards or backwards. This type of focusing mechanism provides a large back focus, enabling a wide range of add-on options to be used.	361.00	Sky-Watcher	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746196972/Skywatcher-Maksutov-telescope-MC-102-1300-Skymax-102S-AZ-Pronto_qzjvbh.jpg	telescope	2025-05-02 16:43:24.733996	2025-05-02 16:43:24.733996	Skywatcher-Maksutov-telescope-MC-102-1300-Skymax-102S-AZ-Pronto_qzjvbh
9	Telescope N 130/650 Explorer 130PDS OTA 	This telescope is a good starting point for new amateur astronomers. With 30% more light gathering capacity than a 114mm telescope, even more fascinating celestial objects can be observed by amateur astronomer newbies. The 130mm aperture and 650 mm focal length high-performance optics allow you to observe many nebulae and other DSOs. With an f5 aperture ratio, the telescope is also ideal for wide field observing. Breathtakingly beautiful Open clusters are well worth seeking out too. Its short length means that the telescope is very stable, even on smaller mounts, with vibrations damping down very quickly. The external design can also be considered a real gem, boasting an elegant design of the highest calibre.	329.00	Sky-Watcher	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746202401/Skywatcher-Telescope-N-130-650-Explorer-130PDS-OTA_yyzayl.jpg	telescope	2025-05-02 18:13:50.603322	2025-05-02 18:13:50.603322	Skywatcher-Telescope-N-130-650-Explorer-130PDS-OTA_yyzayl
21	 Filters UV/IR L CMOS 1.25" 		65.00	Baader	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746272869/Baader-Filters-UV-IR-L-CMOS-1-25-_sbdvhd.jpg	filter	2025-05-03 13:48:19.83921	2025-05-03 13:48:19.83921	Baader-Filters-UV-IR-L-CMOS-1-25-_sbdvhd
1	Telescope AC 70/700 AZ-2	The Omegon AC 70/700 telescope is your first taste of the world of astronomy. Practical observing with it is so simple that it highly suitable for children and adults alike. The instrument is simple to understand and is very quick to set up ,without any tools being required. Simply set it up, insert eyepiece and observe!	129.00	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746174798/Omegon-Telescope-AC-70-700-AZ-2_p9eqyq.jpg	telescope	2025-05-02 10:35:01.733453	2025-05-02 10:35:01.733453	Omegon-Telescope-AC-70-700-AZ-2_p9eqyq
3	Apochromatic refractor AP 150/1200 EvoStar ED EQ6R GoTo 	Apochromatic Refractors, due to their unobstructed, text-book like diffraction patterns, produce the sharpest, highest quality optical imaging available, bar-none, aperture for aperture, of any telescope optical system.\n\nThe high-end Evostar-150ED Apo doublet features an undisclosed combination of one Extra-Low Dispersion (ED) glass element and a matched crown element. Each air-to-glass objective lens surface has exotic anti-reflection metallic coatings applied, to ensure optimum light throughput of approaching 99.5%. The proprietary Sky-Watcher “Metallic High-Transmission Coatings” (MHC) are the finest photon anti-rejection coatings in their class.\n\nThe Evostar-150ED is supplied without eyepiece, finderscope and star diagonal.	3733.00	Sky-Watcher	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746187594/Omegon-Telescope-AC-70-700-AZ-2_xrjprv.jpg	telescope	2025-05-02 14:08:40.825564	2025-05-02 14:08:40.825564	Omegon-Telescope-AC-70-700-AZ-2_xrjprv
16	 Ultra Wide Angle eyepiece 6mm 1,25" 	Omegon Ultra Wide Angle eyepieces provide impressive optics with an enormously wide 66° field of view. Just how can wide-angle eyepieces be offered at such a low price? This is very unusual and these eyepieces are well-known among amateur astronomers, and are affectionately known as the 'gold-line' eyepieces.	69.00	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746270561/Omegon-Ultra-Wide-Angle-eyepiece-6mm-1-25-_enuwr1.jpg	eyepiece	2025-05-03 13:10:00.417517	2025-05-03 13:10:00.417517	Omegon-Ultra-Wide-Angle-eyepiece-6mm-1-25-_enuwr1
17	 Panorama II 1.25'', 10mm eyepiece 	Omegon 100 degree eyepieces give you a huge field of view, with sharp stars right out to the edge. Take in huge star fields and extended objects within the field of view. Impressively large screens are not just for TVs, but also for the view into the night sky through your telescope.	229.00	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746270824/Omegon-Panorama-II-1-25-10mm-eyepiece_gxinvi.jpg	eyepiece	2025-05-03 13:14:43.216474	2025-05-03 13:14:43.216474	Omegon-Panorama-II-1-25-10mm-eyepiece_gxinvi
18	 Magnum 1.25'', 8-24mm zoom eyepiece 	If you don't want to start your new hobby of astronomy needing a case full of eyepieces, then purchasing a zoom eyepiece is the right way for you and your telescope. The Magnum Zoom provides you with a wide range of magnifications all combined in a single eyepiece, hence also saving space. So you will no longer have to make any decisions regarding which eyepiece you need! You will soon enjoy observing lunar craters, planets and deep sky objects.	59.00	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746271066/Omegon-Magnum-1-25-8-24mm-zoom-eyepiece_myi6ou.jpg	eyepiece	2025-05-03 13:18:22.474923	2025-05-03 13:18:22.474923	Omegon-Magnum-1-25-8-24mm-zoom-eyepiece_myi6ou
19	 Reticle eyepieces Illuminated crosshair eyepiece, Kellner 12mm 	The Omegon crosshair eyepiece is ideally suited for guiding astrophotos when used in off-axis guiders or guide scopes. The extremely fine, illuminated double crosshairs make tracking the guide star much straightforward for you. Instead of having to cover the star, as with single crosshairs, you can keep it precisely positioned in the centre of the eyepiece. Any deviation from this position is noticed immediately, and in time to be able to react.	69.00	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746271382/Omegon-Reticle-eyepieces-Illuminated-crosshair-eyepiece-Kellner-12mm_eflbzd.jpg	eyepiece	2025-05-03 13:23:35.901199	2025-05-03 13:23:35.901199	Omegon-Reticle-eyepieces-Illuminated-crosshair-eyepiece-Kellner-12mm_eflbzd
6	Maksutov telescope MC 127/1500 NexStar 127 SLT GoTo 	The brand new NexStar SLT series with SkyAlign technology offers computerized GoTo telescopes with a multilingual menu and huge database, as well as being excellent value for money.\n\nThe fully assembled ready-to-use tripod and quick-release couplings for connection to the fork mount, as well as the OTA on a fork arm allow setting up in just a few minutes - without the need of any tools!\n\nA huge range of celestial objects are available to observe, and the computer can also select the best objects to observe month by month.	779.95	Celestron	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746200622/Celestron-Maksutov-telescope-MC-127-1500-NexStar-127-SLT-GoTo_kox0re.jpg	telescope	2025-05-02 17:44:14.133035	2025-05-02 17:44:14.133035	Celestron-Maksutov-telescope-MC-127-1500-NexStar-127-SLT-GoTo_kox0re
8	Dobson telescope N 130/650 Heritage FlexTube DOB 	A large aperture for a little money - that was always the main idea when acquiring a Dobsonian telescope. With their BlackDiamond Dobsonian, Sky-Watcher have created a classic with a new slant. The new, patented, a novel patented sliding rod design makes it is particularly easy to transport. Another advantage of this is that it allows the focus point to be flexibly shifted by sliding the rods further in or out. The Sky-Watcher N130 / 650. This telescope was specially designed to celebrate the International Year of Astronomy (IYA 2009) and hence also the 400th anniversary of the first Galilean telescope. It is not only a high-precision optical instrument, but also makes a nice collector's item and the perfect gift. The telescope tube is decorated with the names of many famous people who have made a significant contribution to research in astronomy over the last 400 years, including Galileo Galilei himself. The telescope is an all-rounder, offering superb views of the Moon, planets and the easier deep sky objects. The patented truss tube system means the telescope is very easy to transport and store. Unlike many standard Newtonians, there is no problem with the focus position in this Sky-Watcher truss tube Dobsonian. The position of focal point can be flexibly adapted. The easy handling of the Dobsonian mount offers a great way of getting started in amateur astronomy and the telescope is also ultra compact. The complete telescope with mount comes completely assembled straight out of the gift box.\n\nThe most Dobsonian telescopes are only available from the 200mm upwards. This 130mm Dobsonian can be considered an exception, making it an ideal travel and beginner's instrument, which requires only a little space. With only a 650mm focal length, the Dobsonian has an aperture ratio of f5; meaning wonderful wide field observing is possible. Being able to observe extended nebulae under a dark sky is just one of the great strengths of this instrument. Focusing is via a screw-in focuser with clamp for 1.25" eyepieces.	265.00	Sky-Watcher	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746201858/Skywatcher-Dobson-telescope-N-130-650-Heritage-FlexTube-DOB_kekboy.jpg	telescope	2025-05-02 18:04:53.587354	2025-05-02 18:04:53.587354	Skywatcher-Dobson-telescope-N-130-650-Heritage-FlexTube-DOB_kekboy
10	Twinmaster AZ mount with stainless steel tripod 	Omegon Twinmaster - an altazimuth mount which can take two telescopes\nPerhaps you have more than one telescope, or you want to use your telescope with a pair of binoculars on your mount at the same time? Nothing could be simpler with the Omegon Twinmaster. This altazimuth mount can carry two instruments simultaneously.\nThe all-rounder for two instruments\nJust put your main telescope and another instrument of your choice, such as binoculars, on your Twinmaster. It is best when the two instruments differ as much as possible -allowing you to benefit from two different impressions when observing. For example, you can go into the detail with your telescope but also enjoy majestic vistas of the night sky with your binoculars. Or you could mount completely different instruments - everything is completely flexible with the Twinmaster mount.\nYour instruments are mounted in a jiffy\nMounting your telescopes or binoculars is done via GP rail. So you can mount each instrument with a standard prism rail and clamp it via a side screw and then simply slide it into the correct position. Set-up and subsequent dismantling with this azimuthal mount is super-fast.\nSlow motion control in all directions\nThe practical manual axis clamping allows you to freely adjust each instrument and easily clamp it in place again when the desired orientation has been achieved. Two separate knobs offer precise slow motion control in any direction. Eminently practical - the slow motion controls operate both instruments simultaneously. That means absolutely no stress and maximum observing comfort.\nUp to a 13kg instrument - on each side\nThe Omegon Twinmaster can carry instruments of up to 13kg in weight. That means the mount is also suitable for carrying larger instruments such as a 10 inch SC OTA for example.\nWith the 20mm counterweight shaft (counterweights not included) sets up the optimal balance of the telescope correctly. The counterweight shaft can, depending on use, be used for either the right or left instrument.	649.00	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746219687/Omegon-Twinmaster-AZ-mount-with-stainless-steel-tripod_xbtice.jpg	mount	2025-05-02 23:01:58.744695	2025-05-02 23:01:58.744695	Omegon-Twinmaster-AZ-mount-with-stainless-steel-tripod_xbtice
15	 SWA 38mm eyepiece, 2” 	Super wide angle eyepieces have long been held in high regard due to their extremely wide apparent fields of view. Only with SWAs did the so-called 'space walk' effect - almost like the view through a spaceship window - become reality.	179.00	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746270309/Omegon-SWA-38mm-eyepiece-2r_px18xf.jpg	eyepiece	2025-05-03 13:05:46.136797	2025-05-03 13:05:46.136797	Omegon-SWA-38mm-eyepiece-2r_px18xf
20	 Filters Moon filter 1.25" 	The 1.25" moon filter, consisting of flat steamed glass, is simply screwed into the eyepiece thread. It reduces the brightness of the moon andthusenhances thecontrastin the observation. This filter is mainly necessary during the major moon phases, since the subjective glare of the moon then is strongest and can quickly become unpleasant.	19.00	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746272654/Omegon-Filters-Moon-filter-1-25-_tpxvjh.jpg	filter	2025-05-03 13:44:42.677742	2025-05-03 13:44:42.677742	Omegon-Filters-Moon-filter-1-25-_tpxvjh
2	Telescope AC 90/1000 EQ-2 	The Omegon 90/1000mm EQ-2 refractor provides you with a good starting point for being able to more closely observe the night sky. The rugged high quality optics and mount are well matched to each other.\n\nYour interest in the night sky will turn into fascination!	305.00	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746185658/Omegon-Telescope-AC-90-1000-EQ-2_ybuaba.jpg	telescope	2025-05-02 13:35:04.893732	2025-05-02 13:35:04.893732	Omegon-Telescope-AC-90-1000-EQ-2_ybuaba
7	Telescope N 200/1000 PDS Explorer BD HEQ5 Pro SynScan GoTo 	With a 200mm aperture, this telescope opens up new details in deep sky observing for the observer as compared to smaller telescopes. With 78% more light gathering ability compared to a 150mm telescope, even the delicate spiral arms of many galaxies and additional structures in other nebulae can be observed. Globular clusters, such as the famous M13 cluster in Hercules, can be resolved at their edges to a large degree. The parabolic primary mirror is diffraction limited, allowing sharp images of the object. The very high-contrast optics are optimised by the use of a small secondary mirror and thin secondary mirror spider vanes, allowing sharp and bright planetary observing even at higher magnification. The OTA has a solid 2-inch Crayford focuser for a low image shift focusing - of particular importance at high magnifications and for astrophotography. The use of 2 inch eyepieces allows the maximum possible field of view to be exploited. The telescope has an f5 aperture ratio, putting it in the class of 'fast' Newtonian telescopes, so this telescope is particularly well suited to astrophotography.\n\nThe OTA is also visually a real gem, featuring an elegant design for the both OTA and finder scope in an aesthetically pleasing shimmering black.	1617.00	Sky-Watcher	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746201238/Skywatcher-Telescope-N-200-1000-PDS-Explorer-BD-HEQ5-Pro-SynScan-GoTo_hvwhhg.jpg	telescope	2025-05-02 17:54:41.74189	2025-05-02 17:54:41.74189	Skywatcher-Telescope-N-200-1000-PDS-Explorer-BD-HEQ5-Pro-SynScan-GoTo_hvwhhg
11	Mount Star Discovery AZ SynScan WiFi GoTo 	The Star Discovery mount with SynScan™ WIFI module generates its own WLAN. This makes it wirelessly controllable with your Android, iOS smartphone or tablet. All you have to do is install the free SynScan app on your mobile device.\n\nControl via the SynScan app has many advantages - It is wireless, particularly intuitive with its touch screen and graphical user interface and offers other options, such as the astronomical highlights for the current night, identification of astronomical objects, etc.\n\nThe initialization required before observing is also very straightforward and uses GPS data from your mobile device. After performing the simple alignment procedure, you are then immediately ready to start exploring the universe. The SynScan app allows fully computerized GoTo control of the mount and automatically slews your telescope to any object you select from the extensive database of over 10,000 objects.	349.95	Sky-Watcher	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746224319/Skywatcher-Mount-Star-Discovery-AZ-SynScan-WiFi-GoTo_xnozem.jpg	mount	2025-05-03 00:19:10.460955	2025-05-03 00:19:10.460955	Skywatcher-Mount-Star-Discovery-AZ-SynScan-WiFi-GoTo_xnozem
12	Mount EQ5	This mount is a further development of the EQ-5, in a white design. It provides a solid platform for most large telescopes and is excellent for exploring the night sky. Once you have aligned the parallactic mount on the Pole Star, you can easily sight on an object, position it in the field of view, and track it using the slow motion control knobs provided. Fine adjustment is possible in right ascension and declination. The polar elevation at the observing site can be set using the fine scale provided and adjusted perfectly by using two screws. Both a polar finder and electric motors for both axes plus a control unit can be retrofitted: the NEQ-5 is suitable not only for visual observing, but also for getting started in astrophotography. Long exposure astrophotography is also possible with the optional upgrades available, such as the motor kit or the GoTo kit. With a little practice, you will soon be able to produce successful images of galaxies and nebulae.	369.95	Sky-Watcher	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746258825/Skywatcher-Mount-EQ5_dhsti0.jpg	mount	2025-05-03 09:54:43.903199	2025-05-03 09:54:43.903199	Skywatcher-Mount-EQ5_dhsti0
13	 Mount EQ6-R Pro SynScan GoTo 	The computer-controlled EQ6-R PRO Synscan™ mount is an evolutionary improvement of the legendary EQ6 PRO. The modern, streamlined design of the EQ-6 R PRO includes new features that experienced astrophotographers will immediately approve of. The included Synscan™ hand control allows the telescope to find specific objects and offers tours of the current night sky at just the push of a button. The user-friendly menu allows the selection and automatic tracking of over 42,000 astronomical objects.	1659.00	Sky-Watcher	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746259642/Skywatcher-Mount-EQ6-R-Pro-SynScan-GoTo_rnwsl5.jpg	mount	2025-05-03 10:07:59.38732	2025-05-03 10:07:59.38732	Skywatcher-Mount-EQ6-R-Pro-SynScan-GoTo_rnwsl5
14	 1.25'' 32mm super ploessl eyepiece 	Super Ploessl eyepieces are among the most inexpensive available and are true classics. Generations of amateur astronomers have used them for successful astronomy. The ingenious design employs only 5 lenses, but provides a clear and bright image. These are the eyepieces for those who want quality but do not need expensive high-end eyepieces.	39.90	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746261562/Omegon-1-25-32mm-super-ploessl-eyepiece_iko4uw.jpg	eyepiece	2025-05-03 10:39:59.652425	2025-05-03 10:39:59.652425	Omegon-1-25-32mm-super-ploessl-eyepiece_iko4uw
22	 Filters Nebula/ city light filter 1.25 '' 	The Omegon Light Pollution Filter is a type of broadband filter. Its effectiveness makes it universally applicable. The broad passband allows star clusters, galaxies, nebulae and comets to be better observed. However, it also filters out annoying artificial light such as street lighting.	39.00	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746274403/Omegon-Filters-Nebula-city-light-filter-1-25-_dj2jtk.jpg\n	filter	2025-05-03 14:13:56.480958	2025-05-03 14:13:56.480958	Omegon-Filters-Nebula-city-light-filter-1-25-_dj2jtk
23	 solar filter, 60-80mm 	You observe the night sky, but are you also interested in observing the Sun? The Basic solar filter lets you also do astronomy during the day! And the best part is that, if you have an Omegon Basic telescope, it fits directly onto the lens. And you can get started right away with your solar observing!	19.90	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746274592/Omegon-solar-filter-60-80mm_cmvi6d.jpg	filter	2025-05-03 14:17:58.862979	2025-05-03 14:17:58.862979	Omegon-solar-filter-60-80mm_cmvi6d
24	 Telescope AC 60/700 AZ-1 	The optics of the 60/700 lens telescope offers details concerning the observation of the large planets Saturn, Jupiter and Mars and shows (in case of positive visual conditions) well-known Deep Sky objects like the Andromeda Galaxy. It´ s also possible to realize interesting nature observations in daylight with a reversal lens. \nThis mount is very popular with beginners in astronomy as it is very simple to operate. The entire telescope is very easy to move around in both azimuth and elevation. For beginners, it has the advantage that they do not have to worry about first aligning the telescope before use. Setting up the telescope is hence very quick and straightforward: Simply erect the tripod and mount, attach the telescope to it, and you are ready to go! The attitude can be locked in both axes so that, once found, objects remain in the field of view. There is also a fine adjuster for moving the tube precisely in elevation. The mount is attached to a height-adjustable aluminium tripod.	99.00	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746304600/Omegon-Telescope-AC-60-700-AZ-1_q6dgew.jpg	telescope	2025-05-03 22:37:18.245702	2025-05-03 22:37:18.245702	Omegon-Telescope-AC-60-700-AZ-1_q6dgew
25	 Telescope AC 70/400 Solar BackPack AZ 	A solar eclipse is a good reason for taking a trip. It is probably the most exciting drama the heavens have to offer. The Omegon BackPack AZ telescope is ideal for this. It consists of the OTA, a tripod and a solar filter - which all fit in the rucksack provided. It is all so compact that it can fit in any luggage and will give you a great view of solar eclipses.	69.00	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746344149/Omegon-Telescope-AC-70-400-Solar-BackPack-AZ_pvthfx.jpg	telescope	2025-05-04 09:36:16.632832	2025-05-04 09:36:16.632832	Omegon-Telescope-AC-70-400-Solar-BackPack-AZ_pvthfx
26	 Telescope AC 50/600 AZ 	What child hasn't dreamt of gazing at the stars with a telescope? The AC 50/600 opens up the world of skygazing.\nIt takes children on a path into the fascinating world of astronomy, like the moon with its oceans and thousands of craters. This telescope offers tremendous views of the moon and the shadows on its surface.\n\nWith the 50mm lens aperture, it can collect up to 50 times as much light as the naked eye. The included tabletop tripod provides a small azimuth stand.\n\nThe AC 50/600 is a toy that will bring your child closer to nature. And who knows – perhaps it may even kindle the fire that will someday lead to intensive astronomical pursuits.	39.90	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746344491/Omegon-Telescope-AC-50-600-AZ_lv5wdr.jpg	telescope	2025-05-04 09:42:12.219469	2025-05-04 09:42:12.219469	Omegon-Telescope-AC-50-600-AZ_lv5wdr
27	 AC 102/660 AZ-3 telescope 	A long time travelling on a long journey, an adventurer in the sky - comets are wanderers from the depths of our solar system and some come to visit us. Look up at the sky and marvel at the astronomical show. The 102/660 not only provides you with a huge field of view but has particularly fast optics.	389.00	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746344779/Omegon-AC-102-660-AZ-3-telescope_ksyft5.jpg	telescope	2025-05-04 09:46:51.059689	2025-05-04 09:46:51.059689	Omegon-AC-102-660-AZ-3-telescope_ksyft5
28	 Telescope AC 90/900 EvoStar AZ-3 	This optics is equipped with an achromatic objective. Because of a special combination of two lenses within the objective, most of the colour aberrations can be corrected. Thus, you do not have to face so many disturbing irregularities as usual with common Fraunhofer refractors. The aperture ratio of 1:10 has an additional positive effect.	299.00	Sky-Watcher	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746345041/Skywatcher-Telescope-AC-90-900-EvoStar-AZ-3_mipncx.jpg	telescope	2025-05-04 09:51:19.734954	2025-05-04 09:51:19.734954	Media Library telescopes ' Skywatcher-Telescope-AC-90-900-EvoStar-AZ-3_mipncx ' is selected. Skywatcher-Telescope-AC-90-900-EvoStar-AZ-3_mipncx
29	 Telescope AC 70/400 AR-App 	Thanks to the 3 different eyepieces with 20x, 50x and 100x magnification, you can quite literally reach for the stars. If that’s not enough, you can use the Barlow lens to triple each magnification level. The set also comes with a great accessory to introduce you to the world of astrophotography: With the eyepiece smartphone adapter, you can take stunning photos of the moon, planets and other celestial objects and share your discoveries from the night sky with your parents, siblings or friends.	109.90	National Geographic	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746345281/National-Geographic-Telescope-AC-70-400-AR-App_pxw0p4.jpg	telescope	2025-05-04 09:55:28.227582	2025-05-04 09:55:28.227582	National-Geographic-Telescope-AC-70-400-AR-App_pxw0p4
30	 AC 80/400 AZ-3 telescope 	A long time travelling on a long journey, an adventurer in the sky - comets are wanderers from the depths of our solar system and some come to visit us. Look up at the sky and marvel at the astronomical show. The Omegon 80/400 AZ-3 is an optimal companion for your observing.\nThis telescope is so light and so compact that you can simply pick it up and carry it outside to point at comets. It also provides a really wide field of view with its 80mm aperture and 400mm focal length. The slow-motions on the AZ- 3 mount let you easily get on the heels of comets and find them virtually automatically.	269.00	Omegon	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746346076/Omegon-AC-80-400-AZ-3-telescope_pv8bgk.jpg	telescope	2025-05-04 10:08:17.620355	2025-05-04 10:08:17.620355	Omegon-AC-80-400-AZ-3-telescope_pv8bgk
31	 Telescope AC 70/700 Infinity AZ 	With its 70mm aperture, this refractor collects 100 times more light than the naked eye and substantially more light than a typical beginner telescope possessing an only slightly smaller aperture of 60mm. This means it also has a higher resolution and, with a maximum magnification of 140X, can already show you the larger surface features when observing planets such as Saturn, Jupiter and Mars. It is also very rewarding to observe the moon: One can beautifully observe the cratered landscape of the moon, which always looks different depending upon the moon's current phase. It is also interesting for nature watching in daylight - made possible by using an erecting lens or an Amici prism. Focusing takes place by means of a rack and pinion focus wheel at the focuser. This allows the image sharpness to always be precisely adjusted and to remain fixed during observing.	129.00	Meade	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746346414/Meade-Telescope-AC-70-700-Infinity-AZ_fznfsy.jpg	telescope	2025-05-04 10:17:19.478387	2025-05-04 10:17:19.478387	Media Library telescopes ' Meade-Telescope-AC-70-700-Infinity-AZ_fznfsy ' is selected. Meade-Telescope-AC-70-700-Infinity-AZ_fznfsy
32	 Telescope AC 70/700 StarSense Explorer LT 70 AZ 	The StarSense Explorer telescope uses your smartphone to analyze the night sky and calculate its position in real time. StarSense Explorer is ideal for beginners thanks to the app’s user-friendly interface and detailed tutorials. It’s like having your own personal tour guide of the night sky.	199.95	Celestron	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746347238/Celestron-Telescope-AC-70-700-StarSense-Explorer-LT-70-AZ_bhhstf.jpg	telescope	2025-05-04 10:28:18.516675	2025-05-04 10:28:18.516675	Celestron-Telescope-AC-70-700-StarSense-Explorer-LT-70-AZ_bhhstf
33	 Telescope AC 102/660 StarSense Explorer DX 102 AZ 	The StarSense Explorer telescope uses your smartphone to analyze the night sky and calculate its position in real time. StarSense Explorer is ideal for beginners thanks to the app’s user-friendly interface and detailed tutorials. It’s like having your own personal tour guide of the night sky.\n\nLeave complicated star charts, imprecise planetarium apps, and computerized mounts behind. With StarSense Explorer, locating objects has never been easier, faster, or more accurate. Within minutes of setting up the telescope, you’ll be navigating the sky with confidence. Simply place your phone in the unique StarSense dock and launch the StarSense Explorer app. After aligning your phone to the telescope’s optics (a quick, 2-minute procedure), StarSense Explorer generates a list of celestial objects currently visible. Make your selection and arrows appear onscreen, guiding you as you to move the telescope. When the object is ready to view, the bullseye turns green.	458.95	Celestron	https://res.cloudinary.com/dk8fmv1ie/image/upload/v1746347592/Celestron-Telescope-AC-102-660-StarSense-Explorer-DX-102-AZ_d4w2iz.jpg	telescope	2025-05-04 10:33:49.75321	2025-05-04 10:33:49.75321	Celestron-Telescope-AC-102-660-StarSense-Explorer-DX-102-AZ_d4w2iz
\.


--
-- Data for Name: telescope_specs; Type: TABLE DATA; Schema: public; Owner: scientist137-user
--

COPY public.telescope_specs (id, type, optical_design, aperture, focal_length, aperture_ratio, resolving_capacity, limit_value, light_gathering_capacity, max_useful_magnification, mount_type, mount_build_type, "GoTo", total_weight, moon_planets, nebulae_galaxies, nature_observation, astrophotography, sun, beginners, advanced, observatories, telescope_id) FROM stdin;
17	Refractor	Achromat	70	700	10	1.64	11	100	140	Azimuthal	AZ	no	5	yes	no	no	not recommended	no (Only with appropiate filters)	yes	no	no	17
19	Refractor	Achromat	102	660	6.5	1.35	11.8	210	204	Azimuthal	Single tine	PushTo	6.5	yes	yes	no	no	no (Only with appropiate filters)	yes	no	no	19
18	Refractor	Achromat	70	700	10	1.97	11	100	140	Azimuthal	Single tine	PushTo	6	yes	yes	no	no	no (Only with appropiate filters)	yes	no	no	18
1	Refractor	Achromat	70	700	10	1.64	11	100	140	Azimuthal	AZ-2	no	4	yes	not recommended	no	no	no (Only with appropiate filters)	yes	no	no	1
3	Refractor	Apochromat	150	1200	8	0.92	12.7	460	300	Equatorial	EQ-6	yes	44.3	yes	yes	no	yes (very good)	no (Only with appropriate Sun filter)	no	yes	no	3
4	Reflector	Newton	150	750	5	0.77	12.7	460	300	Equatorial	EQ-3	no	43	yes	yes	no	not recommended	not recommended (Only with appropriate Sun filter)	yes	no	no	4
5	Reflector	Maksutov	102	1300	12.7	1.35	11.8	210	204	Azimuthal	AZ Pronto	no	8	yes (very good)	yes	no	no	no (Only with appropiate filters)	yes	no	no	5
6	Reflector	Maksutov	127	1500	11.8	0.91	12.3	330	254	Azimuthal	Azimuthal	yes	8.16	yes	yes	yes	yes (Moon, Planets)	no (Only with appropiate filters)	yes	yes	no	6
7	Reflector	Newton	200	1000	5	0.58	13.3	820	400	Equatorial	HEQ-5 PRO	yes	8.8	yes	yes	no	yes	no (Only with appropiate filters)	yes	yes	no	7
8	Reflector	Newton	130	650	5	0.88	12.4	345	260	Dobson	Dobson	no	6.2	yes	yes	no	no	no	yes	no	no	8
9	Reflector	Newton	130	650	5	0.88	12.4	340	260	no mount	OTA	no	6.6	yes	yes	no	yes	no (Only with appropiate filters)	no	yes	no	9
10	Refractor	Achromat	60	700	11.7	1.92	10.7	70	120	Azimuthal	AZ-1	no	4	yes	not recommended	yes	not recommended	no (Only with appropiate filters)	yes	no	no	10
2	Refractor	Achromat	90	1000	11.1	1.28	11.6	170	180	Equatorial	EQ-2	no	4	yes	yes	no	not recommended	not recommended (Only with appropriate Sun filter)	yes	no	no	2
11	Refractor	Achromat	70	400	5.7	1.64	11	100	140	Azimuthal	AZ	no	1.7	yes	not recommended	yes	not recommended	yes (Only with appropriate Sun filter)	yes	no	no	11
12	Refractor	Achromat	50	600	12	1	11	100	100	Azimuthal	AZ	no	4	yes	not recommended	yes	not recommended	not recommended (Only with appropriate Sun filters)	yes	no	no	12
13	Refractor	Achromat	102	660	6.5	1.13	11.8	210	200	Azimuthal	AZ-3	no	5.2	yes	yes	yes	no	no (Only with appropiate filters)	yes	no	no	13
14	Refractor	Achromat	90	900	10	1.28	11.6	170	180	Azimuthal	AZ-3	no	11.7	yes	yes	yes	not recommended	no (Only with appropiate filters)	yes	no	no	14
15	Refractor	Achromat	70	400	5.7	1.64	11	100	140	Azimuthal	AZ-Mini	no	4	yes	yes	yes	no	no (Only with appropiate filters)	yes	no	no	15
16	Refractor	Achromat	80	400	5	1.44	11.3	130	160	Azimuthal	AZ-3	no	12	yes	no	yes	not recommended	no (Only with appropiate filters)	yes	no	no	16
\.


--
-- Data for Name: telescopes; Type: TABLE DATA; Schema: public; Owner: scientist137-user
--

COPY public.telescopes (id, product_id, optical_design, mount_type) FROM stdin;
1	1	Achromat	Azimuthal
2	2	Achromat	Equatorial
3	3	Apochromat	Equatorial
4	4	Newton	Equatorial
7	7	Newton	Equatorial_GoTo
8	8	Newton	Dobson
9	9	Newton	no_mount
10	24	Achromat	Azimuthal
11	25	Achromat	Azimuthal
12	26	Achromat	Azimuthal
13	27	Achromat	Azimuthal
14	28	Achromat	Azimuthal
15	29	Achromat	Azimuthal
16	30	Achromat	Azimuthal
17	31	Achromat	Azimuthal
18	32	Achromat	Azimuthal
19	33	Achromat	Azimuthal
5	5	Catadioptric	Azimuthal
6	6	Catadioptric	Azimuthal_GoTo
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: scientist137-user
--

COPY public.users (id, name, email, hashedpassword, role, cart) FROM stdin;
1	Admin	admin@email.com	$2b$10$FImQk8XQ6Fw95wj7fcWjEujZ4kiAbZGEoYEtHP/Sc.qTuGzJBBUFm	admin	[]
\.


--
-- Name: eyepieces_id_seq; Type: SEQUENCE SET; Schema: public; Owner: scientist137-user
--

SELECT pg_catalog.setval('public.eyepieces_id_seq', 1, false);


--
-- Name: eyepieces_specs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: scientist137-user
--

SELECT pg_catalog.setval('public.eyepieces_specs_id_seq', 1, false);


--
-- Name: filter_specs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: scientist137-user
--

SELECT pg_catalog.setval('public.filter_specs_id_seq', 1, false);


--
-- Name: filters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: scientist137-user
--

SELECT pg_catalog.setval('public.filters_id_seq', 1, false);


--
-- Name: mount_specs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: scientist137-user
--

SELECT pg_catalog.setval('public.mount_specs_id_seq', 1, false);


--
-- Name: mounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: scientist137-user
--

SELECT pg_catalog.setval('public.mounts_id_seq', 27, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: scientist137-user
--

SELECT pg_catalog.setval('public.products_id_seq', 70, true);


--
-- Name: telescope_specs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: scientist137-user
--

SELECT pg_catalog.setval('public.telescope_specs_id_seq', 1, false);


--
-- Name: telescopes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: scientist137-user
--

SELECT pg_catalog.setval('public.telescopes_id_seq', 43, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: scientist137-user
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: eyepieces eyepieces_pkey; Type: CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.eyepieces
    ADD CONSTRAINT eyepieces_pkey PRIMARY KEY (id);


--
-- Name: eyepieces_specs eyepieces_specs_pkey; Type: CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.eyepieces_specs
    ADD CONSTRAINT eyepieces_specs_pkey PRIMARY KEY (id);


--
-- Name: filter_specs filter_specs_pkey; Type: CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.filter_specs
    ADD CONSTRAINT filter_specs_pkey PRIMARY KEY (id);


--
-- Name: filters filters_pkey; Type: CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.filters
    ADD CONSTRAINT filters_pkey PRIMARY KEY (id);


--
-- Name: mount_specs mount_specs_pkey; Type: CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.mount_specs
    ADD CONSTRAINT mount_specs_pkey PRIMARY KEY (id);


--
-- Name: mounts mounts_pkey; Type: CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.mounts
    ADD CONSTRAINT mounts_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: telescope_specs telescope_specs_pkey; Type: CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.telescope_specs
    ADD CONSTRAINT telescope_specs_pkey PRIMARY KEY (id);


--
-- Name: telescopes telescopes_pkey; Type: CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.telescopes
    ADD CONSTRAINT telescopes_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: eyepieces eyepieces_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.eyepieces
    ADD CONSTRAINT eyepieces_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: eyepieces_specs eyepieces_specs_eyepiece_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.eyepieces_specs
    ADD CONSTRAINT eyepieces_specs_eyepiece_id_fkey FOREIGN KEY (eyepiece_id) REFERENCES public.eyepieces(id) ON DELETE CASCADE;


--
-- Name: filter_specs filter_specs_filter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.filter_specs
    ADD CONSTRAINT filter_specs_filter_id_fkey FOREIGN KEY (filter_id) REFERENCES public.filters(id) ON DELETE CASCADE;


--
-- Name: filters filters_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.filters
    ADD CONSTRAINT filters_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: mount_specs mount_specs_mount_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.mount_specs
    ADD CONSTRAINT mount_specs_mount_id_fkey FOREIGN KEY (mount_id) REFERENCES public.mounts(id) ON DELETE CASCADE;


--
-- Name: mounts mounts_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.mounts
    ADD CONSTRAINT mounts_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: telescope_specs telescope_specs_telescope_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.telescope_specs
    ADD CONSTRAINT telescope_specs_telescope_id_fkey FOREIGN KEY (telescope_id) REFERENCES public.telescopes(id) ON DELETE CASCADE;


--
-- Name: telescopes telescopes_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: scientist137-user
--

ALTER TABLE ONLY public.telescopes
    ADD CONSTRAINT telescopes_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

