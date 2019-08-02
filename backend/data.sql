--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: joel
--

CREATE TABLE public.applications (
    username text NOT NULL,
    job_id integer NOT NULL,
    state text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.applications OWNER TO joel;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: joel
--

CREATE TABLE public.companies (
    handle text NOT NULL,
    name text NOT NULL,
    num_employees integer,
    description text,
    logo_url text
);


ALTER TABLE public.companies OWNER TO joel;

--
-- Name: jobs; Type: TABLE; Schema: public; Owner: joel
--

CREATE TABLE public.jobs (
    id integer NOT NULL,
    title text NOT NULL,
    salary double precision,
    equity double precision,
    company_handle text NOT NULL,
    CONSTRAINT jobs_equity_check CHECK ((equity <= (1.0)::double precision))
);


ALTER TABLE public.jobs OWNER TO joel;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: joel
--

CREATE SEQUENCE public.jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobs_id_seq OWNER TO joel;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joel
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: joel
--

CREATE TABLE public.users (
    username text NOT NULL,
    password text NOT NULL,
    first_name text,
    last_name text,
    email text,
    photo_url text,
    is_admin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO joel;

--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: joel
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Data for Name: applications; Type: TABLE DATA; Schema: public; Owner: joel
--

COPY public.applications (username, job_id, state, created_at) FROM stdin;
\.


--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: joel
--

COPY public.companies (handle, name, num_employees, description, logo_url) FROM stdin;
edwards-lee-and-reese	Edwards, Lee and Reese	744	To much recent it reality coach decision Mr. Dog language evidence minute either deep situation pattern. Other cold bad loss surface real show.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_circle.jpg
sellers-bryant	Sellers-Bryant	369	Language discussion mission soon wait according executive. Financial say husband anyone money politics. Dinner action purpose mouth environment I white.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_arc.jpg
bauer-gallagher	Bauer-Gallagher	862	Difficult ready trip question produce produce someone.	
arnold-berger-and-townsend	Arnold, Berger and Townsend	795	Kind crime at perhaps beat. Enjoy deal purpose serve begin or thought. Congress everything miss tend.	
miller-woods-and-hernandez	Miller, Woods and Hernandez	444	Including theory protect reveal energy himself probably. Test leave mother area however.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_arc.jpg
davis-davis	Davis-Davis	23	Career participant difficult. Decide claim particular century society. Question growth two staff.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_arc.jpg
jackson-and-sons	Jackson and Sons	649	President couple political sit create.	
smith-llc	Smith LLC	908	Statement use per mission method. Order truth method.	
humphrey-llc	Humphrey LLC	678	Agent actually able paper nor. Tell then court full agree without assume.	
salas-group	Salas Group	624	Central whom mouth partner bring newspaper special city. Show second cost newspaper can early play.	
morgan-sullivan	Morgan-Sullivan	409	Own once artist part put authority wait. Focus free even. Why friend civil visit.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_arc.jpg
perez-miller	Perez-Miller	298	Space one approach wife son. Themselves give necessary follow employee return feel. Step animal doctor sign water early.	
carr-wells-and-jones	Carr, Wells and Jones	27	Human medical throw book pick possible. Maybe yeah word beat treatment impact campaign.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_arc.jpg
thomas-and-sons	Thomas and Sons	51	Book detail scene continue. Art strategy because list two.	
mitchell-brown	Mitchell-Brown	288	Republican truth church generation voice price issue.	
watson-davis	Watson-Davis	819	Year join loss.	
logan-miller	Logan-Miller	429	Pattern hand where never. Social across ability which structure.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_circle.jpg
taylor-yu-and-lee	Taylor, Yu and Lee	226	Down bag serve. Officer season company.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_arc.jpg
hudson-inc	Hudson Inc	627	End now meet staff. Long government force why bar. Provide bring hope staff almost many be a.	
mejia-scott-and-ryan	Mejia, Scott and Ryan	628	General traditional late situation discussion dog. Before best up strategy about direction.	
scott-smith	Scott-Smith	993	Room newspaper foot. Student daughter their themselves top almost near. Wait time recently it street follow medical nothing.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_arc.jpg
norman-harvey	Norman-Harvey	837	Drop along test material education. Opportunity forget campaign federal certainly total hair.	
hall-mills	Hall-Mills	266	Change stage tell note hundred. Worry where program wait.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_arc.jpg
gillespie-smith	Gillespie-Smith	302	Candidate ability democratic make drug. Player themselves like front. Over through style loss win very when.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_circle.jpg
boyd-evans	Boyd-Evans	698	Build respond generation tree. No five keep. Happy medical back fine focus suffer modern.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_arc.jpg
martinez-daniels	Martinez-Daniels	12	Five source market nation. Drop foreign raise pass.	
willis-henson-and-miller	Willis, Henson and Miller	821	About dream practice. Father significant senior health within four.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_arc.jpg
wiggins-frederick-and-boyer	Wiggins, Frederick and Boyer	298	Institution structure say argue bit. Each option high executive easy pattern. Majority white hour there reach drive produce.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_circle.jpg
stone-stewart	Stone-Stewart	459	Require successful family but. Traditional article late eight lose common send budget. Better opportunity law country various represent strong probably.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_circle.jpg
mueller-moore	Mueller-Moore	932	Edge may report though least pressure likely. Cost short appear program hair seven.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_circle.jpg
rivas-llc	Rivas LLC	552	Would road lot research wide mouth. Resource along office drug.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_circle.jpg
garner-michael	Garner-Michael	940	Necessary thousand parent since discuss director. Visit machine skill five the.	
owen-newton	Owen-Newton	953	Red compare try way. Bed standard again number wrong force. Stop exactly agent product economy someone. North describe site manager employee customer.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_circle.jpg
jackson-davila-and-conley	Jackson, Davila and Conley	813	Consider with build either.	
robbins-marsh-and-martin	Robbins, Marsh and Martin	709	Now never worry usually another ability concern hair. Fly lot six protect participant. Teach through head.	
garcia-ray	Garcia-Ray	217	Laugh low follow fear. Politics main size fine.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_arc.jpg
baker-santos	Baker-Santos	225	Compare certain use. Writer time lay word garden. Resource task interesting voice.	
ingram-ferguson-and-rubio	Ingram, Ferguson and Rubio	753	Human summer field mean impact could exactly. Business read north project will. Left dream use Democrat.	
burton-ltd	Burton Ltd	610	Cover couple speech bar cell measure movement finally. Nation pull inside.	
anderson-arias-and-morrow	Anderson, Arias and Morrow	245	Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.	
foster-rice	Foster-Rice	901	Either relate himself. Source TV data one general. Actually than seat eight.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_circle.jpg
weber-hernandez	Weber-Hernandez	681	Contain product south picture scientist.	
moore-plc	Moore PLC	100	Magazine thing eight shake window might they organization. Environmental it bag green.	
ayala-buchanan	Ayala-Buchanan	309	Make radio physical southern. His white on attention kitchen market upon. Represent west open seven. Particularly subject billion much score thank bag somebody.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_arc.jpg
russo-gillespie-and-conrad	Russo, Gillespie and Conrad	398	South sound knowledge guy. Up I size anyone issue drop. Agent light significant mouth while.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_circle.jpg
reynolds-greene	Reynolds-Greene	343	Effect win area officer office economy. Congress travel would resource difficult. Nice president mind dinner.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_circle.jpg
hall-davis	Hall-Davis	749	Adult go economic off into. Suddenly happy according only common. Father plant wrong free traditional.	
pugh-ltd	Pugh Ltd	87	Believe reflect perform TV son.	http://www.gtdesigns.it/wp-content/uploads/OverusedLogos/99gen_arc.jpg
graham-herring-and-lane	Graham, Herring and Lane	188	Enough attack return. Fall gas someone her another point those. Star public painting show concern.	
erickson-inc	Erickson Inc	267	Interesting environment owner beautiful school politics. General friend hair player dinner last administration teacher.	
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: joel
--

COPY public.jobs (id, title, salary, equity, company_handle) FROM stdin;
1	Editor, magazine features	118000	0.149999999999999994	foster-rice
2	Tree surgeon	130000	0.0800000000000000017	hall-davis
3	Multimedia programmer	154000	0.0400000000000000008	owen-newton
4	Freight forwarder	183000	0.0899999999999999967	hudson-inc
5	Applications developer	84000	0.0400000000000000008	sellers-bryant
6	Sports development officer	102000	0.170000000000000012	scott-smith
7	Clothing/textile technologist	171000	0.179999999999999993	smith-llc
8	Secretary/administrator	172000	0.149999999999999994	jackson-and-sons
9	Psychologist, occupational	190000	0.140000000000000013	robbins-marsh-and-martin
10	Leisure centre manager	135000	0.0200000000000000004	edwards-lee-and-reese
11	Best boy	193000	0.0599999999999999978	jackson-and-sons
12	Field seismologist	62000	0.0800000000000000017	martinez-daniels
13	Art gallery manager	114000	0.190000000000000002	anderson-arias-and-morrow
14	Management consultant	183000	0.130000000000000004	edwards-lee-and-reese
15	Ergonomist	160000	0.179999999999999993	bauer-gallagher
16	Engineer, materials	185000	0.110000000000000001	garner-michael
17	Race relations officer	97000	0.110000000000000001	bauer-gallagher
18	Engineering geologist	89000	0.190000000000000002	ayala-buchanan
19	Aeronautical engineer	135000	0.0599999999999999978	norman-harvey
20	Development worker, community	192000	0.0800000000000000017	weber-hernandez
21	Psychologist, forensic	176000	0.0800000000000000017	boyd-evans
22	Architectural technologist	57000	0.0800000000000000017	owen-newton
23	Speech and language therapist	154000	0.0100000000000000002	humphrey-llc
24	Patent attorney	143000	0.170000000000000012	foster-rice
25	Designer, jewellery	92000	0.0200000000000000004	weber-hernandez
26	Health promotion specialist	72000	0.200000000000000011	burton-ltd
27	Television production assistant	99000	0.140000000000000013	edwards-lee-and-reese
28	Engineer, chemical	81000	0.0899999999999999967	russo-gillespie-and-conrad
29	Careers adviser	57000	0.140000000000000013	carr-wells-and-jones
30	Surveyor, minerals	98000	0.110000000000000001	carr-wells-and-jones
31	Forest/woodland manager	156000	0	carr-wells-and-jones
32	Haematologist	63000	0.0700000000000000067	ayala-buchanan
33	Speech and language therapist	159000	0.0800000000000000017	gillespie-smith
34	Orthoptist	200000	0.160000000000000003	perez-miller
35	Camera operator	130000	0.0700000000000000067	arnold-berger-and-townsend
36	Advertising account executive	130000	0	thomas-and-sons
37	Field trials officer	137000	0	davis-davis
38	Ship broker	124000	0.0400000000000000008	davis-davis
39	Bonds trader	134000	0.160000000000000003	mitchell-brown
40	Transport planner	90000	0.119999999999999996	reynolds-greene
41	Historic buildings inspector/conservation officer	135000	0.149999999999999994	rivas-llc
42	Investment banker, corporate	131000	0.0299999999999999989	ingram-ferguson-and-rubio
43	Conservation officer, historic buildings	168000	0.0200000000000000004	robbins-marsh-and-martin
44	Intelligence analyst	148000	0.0599999999999999978	sellers-bryant
45	Naval architect	126000	0.179999999999999993	scott-smith
46	Podiatrist	68000	0.0599999999999999978	reynolds-greene
47	Physicist, medical	190000	0.200000000000000011	humphrey-llc
48	Fisheries officer	67000	0.0200000000000000004	hall-davis
49	Conservator, furniture	110000	0.119999999999999996	watson-davis
50	Air cabin crew	105000	0.0599999999999999978	ingram-ferguson-and-rubio
51	Financial trader	153000	0.0599999999999999978	garner-michael
52	Nurse, children's	162000	0.149999999999999994	humphrey-llc
53	Information officer	200000	0.130000000000000004	hall-mills
54	Paramedic	122000	0.119999999999999996	baker-santos
55	Consulting civil engineer	60000	0.0599999999999999978	sellers-bryant
56	Historic buildings inspector/conservation officer	129000	0.190000000000000002	watson-davis
57	Early years teacher	55000	0.0700000000000000067	perez-miller
58	Transport planner	123000	0.0599999999999999978	hudson-inc
59	Intelligence analyst	77000	0.0899999999999999967	garner-michael
60	Counsellor	154000	0.0899999999999999967	owen-newton
61	Surveyor, building	144000	0.0700000000000000067	russo-gillespie-and-conrad
62	Technical brewer	157000	0.149999999999999994	anderson-arias-and-morrow
63	Control and instrumentation engineer	171000	0.140000000000000013	salas-group
64	Photographer	198000	0.130000000000000004	davis-davis
65	Multimedia programmer	192000	0.200000000000000011	graham-herring-and-lane
66	Public librarian	115000	0.0800000000000000017	norman-harvey
67	Press sub	100000	0.170000000000000012	erickson-inc
68	Writer	172000	0.0400000000000000008	anderson-arias-and-morrow
69	Designer, fashion/clothing	81000	0	garcia-ray
70	Information systems manager	123000	0.0200000000000000004	arnold-berger-and-townsend
71	English as a foreign language teacher	111000	0.190000000000000002	russo-gillespie-and-conrad
72	Passenger transport manager	70000	0	rivas-llc
73	Art gallery manager	73000	0.0599999999999999978	perez-miller
74	Operational researcher	167000	0.0400000000000000008	ayala-buchanan
75	Psychologist, clinical	172000	0.100000000000000006	hudson-inc
76	Solicitor	131000	0.0800000000000000017	wiggins-frederick-and-boyer
77	Dealer	175000	0.0800000000000000017	hall-mills
78	Financial planner	115000	0.0400000000000000008	taylor-yu-and-lee
79	Scientist, forensic	50000	0.160000000000000003	foster-rice
80	Therapist, music	103000	0.149999999999999994	reynolds-greene
81	Occupational therapist	183000	0.0800000000000000017	garcia-ray
82	Dietitian	198000	0.0100000000000000002	ayala-buchanan
83	Teacher, music	127000	0.0100000000000000002	ingram-ferguson-and-rubio
84	Ophthalmologist	135000	0	hall-mills
85	Clinical cytogeneticist	152000	0.0599999999999999978	mitchell-brown
86	Engineer, civil (contracting)	162000	0.190000000000000002	moore-plc
87	Nature conservation officer	82000	0.100000000000000006	watson-davis
88	Electrical engineer	157000	0.0899999999999999967	jackson-davila-and-conley
89	Agricultural consultant	67000	0.0800000000000000017	moore-plc
90	Embryologist, clinical	138000	0.0299999999999999989	anderson-arias-and-morrow
91	Chief of Staff	110000	0.110000000000000001	scott-smith
92	Marine scientist	54000	0.160000000000000003	scott-smith
93	Tourist information centre manager	88000	0.0500000000000000028	foster-rice
94	Interior and spatial designer	177000	0.100000000000000006	gillespie-smith
95	Surveyor, rural practice	193000	0.0899999999999999967	weber-hernandez
96	Interpreter	55000	0.0599999999999999978	hudson-inc
97	Financial controller	58000	0.190000000000000002	sellers-bryant
98	Geochemist	104000	0.0299999999999999989	hudson-inc
99	Glass blower/designer	126000	0.130000000000000004	anderson-arias-and-morrow
100	Geochemist	130000	0.0899999999999999967	smith-llc
101	Scientist, research (physical sciences)	117000	0.110000000000000001	ayala-buchanan
102	Water engineer	67000	0.0100000000000000002	mejia-scott-and-ryan
103	Geologist, engineering	116000	0.170000000000000012	jackson-davila-and-conley
104	Clinical biochemist	92000	0.0299999999999999989	norman-harvey
105	Colour technologist	81000	0	burton-ltd
106	Historic buildings inspector/conservation officer	65000	0.0700000000000000067	mejia-scott-and-ryan
107	Technical brewer	77000	0.119999999999999996	thomas-and-sons
108	Buyer, industrial	147000	0.0200000000000000004	reynolds-greene
109	Engineer, energy	186000	0.179999999999999993	arnold-berger-and-townsend
110	Plant breeder/geneticist	155000	0.160000000000000003	thomas-and-sons
111	Pharmacist, hospital	194000	0.170000000000000012	boyd-evans
112	Surveyor, insurance	130000	0.130000000000000004	martinez-daniels
113	Medical sales representative	125000	0.149999999999999994	jackson-davila-and-conley
114	Energy engineer	62000	0.0400000000000000008	norman-harvey
115	Occupational hygienist	79000	0.100000000000000006	reynolds-greene
116	Research officer, government	167000	0.160000000000000003	mejia-scott-and-ryan
117	Contractor	89000	0.140000000000000013	mueller-moore
118	Hydrologist	50000	0.0599999999999999978	wiggins-frederick-and-boyer
119	Aeronautical engineer	156000	0	perez-miller
120	Freight forwarder	183000	0.0299999999999999989	burton-ltd
121	Research officer, political party	134000	0.0200000000000000004	garner-michael
122	Engineer, materials	140000	0.170000000000000012	mitchell-brown
123	Oceanographer	110000	0.0100000000000000002	anderson-arias-and-morrow
124	Product designer	184000	0.190000000000000002	gillespie-smith
125	Editor, film/video	199000	0.0200000000000000004	bauer-gallagher
126	Advertising account executive	146000	0.0100000000000000002	thomas-and-sons
127	Barrister	130000	0.119999999999999996	stone-stewart
128	Fashion designer	131000	0	taylor-yu-and-lee
129	Legal secretary	155000	0.0500000000000000028	pugh-ltd
130	Financial risk analyst	72000	0.0100000000000000002	scott-smith
131	Regulatory affairs officer	96000	0.0400000000000000008	logan-miller
132	Ranger/warden	86000	0.0599999999999999978	ayala-buchanan
133	Loss adjuster, chartered	76000	0.119999999999999996	bauer-gallagher
134	Probation officer	128000	0.149999999999999994	foster-rice
135	Therapist, occupational	82000	0.160000000000000003	mejia-scott-and-ryan
136	Farm manager	138000	0.149999999999999994	stone-stewart
137	Teacher, secondary school	127000	0.0700000000000000067	sellers-bryant
138	Primary school teacher	142000	0.190000000000000002	moore-plc
139	Quality manager	138000	0.0400000000000000008	russo-gillespie-and-conrad
140	Radio producer	99000	0	mitchell-brown
141	Music therapist	100000	0.140000000000000013	taylor-yu-and-lee
142	Farm manager	68000	0.0200000000000000004	morgan-sullivan
143	Scientist, product/process development	106000	0.0599999999999999978	scott-smith
144	Camera operator	51000	0.110000000000000001	jackson-davila-and-conley
145	Surveyor, building control	69000	0.110000000000000001	reynolds-greene
146	Engineer, technical sales	167000	0.110000000000000001	ingram-ferguson-and-rubio
147	Database administrator	79000	0.0700000000000000067	willis-henson-and-miller
148	Ranger/warden	145000	0.100000000000000006	jackson-davila-and-conley
149	IT consultant	59000	0.0599999999999999978	gillespie-smith
150	Lawyer	162000	0.200000000000000011	hall-mills
151	Insurance underwriter	120000	0.130000000000000004	hall-davis
152	Museum/gallery conservator	82000	0.130000000000000004	mejia-scott-and-ryan
153	Estate manager/land agent	94000	0.100000000000000006	jackson-davila-and-conley
154	Trade mark attorney	171000	0.179999999999999993	mueller-moore
155	Orthoptist	129000	0.179999999999999993	willis-henson-and-miller
156	Recycling officer	57000	0.160000000000000003	carr-wells-and-jones
157	Scientist, research (life sciences)	157000	0.0400000000000000008	ayala-buchanan
158	Astronomer	143000	0	watson-davis
159	Engineering geologist	170000	0.0599999999999999978	garcia-ray
160	Armed forces technical officer	136000	0.200000000000000011	scott-smith
161	Public relations officer	112000	0.0800000000000000017	weber-hernandez
162	Set designer	132000	0.119999999999999996	russo-gillespie-and-conrad
163	Accountant, chartered certified	86000	0.149999999999999994	boyd-evans
164	Special effects artist	101000	0.149999999999999994	willis-henson-and-miller
165	Television production assistant	125000	0	logan-miller
166	Accountant, chartered certified	175000	0.140000000000000013	stone-stewart
167	Glass blower/designer	60000	0.0500000000000000028	mueller-moore
168	Chief Executive Officer	83000	0.0299999999999999989	miller-woods-and-hernandez
169	Print production planner	197000	0.130000000000000004	humphrey-llc
170	Psychologist, counselling	180000	0.170000000000000012	perez-miller
171	Meteorologist	81000	0.200000000000000011	sellers-bryant
172	Surveyor, insurance	59000	0.100000000000000006	foster-rice
173	Therapist, drama	200000	0.0100000000000000002	hall-mills
174	Merchant navy officer	106000	0.130000000000000004	mitchell-brown
175	Engineer, technical sales	157000	0.140000000000000013	baker-santos
176	Medical physicist	84000	0.190000000000000002	perez-miller
177	Scientist, audiological	61000	0.140000000000000013	foster-rice
178	Surveyor, building	144000	0	salas-group
179	Engineer, water	165000	0.179999999999999993	ingram-ferguson-and-rubio
180	Psychologist, counselling	111000	0.0100000000000000002	taylor-yu-and-lee
181	Astronomer	55000	0.0899999999999999967	martinez-daniels
182	Medical physicist	110000	0.0100000000000000002	mitchell-brown
183	Chief Technology Officer	64000	0.200000000000000011	robbins-marsh-and-martin
184	Arboriculturist	191000	0	salas-group
185	Research scientist (medical)	175000	0.0200000000000000004	norman-harvey
186	Ship broker	177000	0.190000000000000002	hall-davis
187	Conservation officer, nature	108000	0.130000000000000004	jackson-davila-and-conley
188	Bookseller	164000	0.119999999999999996	reynolds-greene
189	Medical sales representative	196000	0.0100000000000000002	hall-mills
190	Psychologist, sport and exercise	172000	0.0400000000000000008	ayala-buchanan
191	Copy	103000	0.0299999999999999989	foster-rice
192	Designer, furniture	149000	0	mueller-moore
193	Chartered loss adjuster	72000	0.0200000000000000004	davis-davis
194	Learning disability nurse	66000	0.0700000000000000067	ayala-buchanan
195	Producer, radio	168000	0.0599999999999999978	salas-group
196	Operational investment banker	200000	0.140000000000000013	smith-llc
197	Engineer, broadcasting (operations)	86000	0	baker-santos
198	Surveyor, quantity	72000	0.110000000000000001	mejia-scott-and-ryan
199	Fashion designer	137000	0.0599999999999999978	reynolds-greene
200	Accommodation manager	126000	0.0500000000000000028	mejia-scott-and-ryan
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: joel
--

COPY public.users (username, password, first_name, last_name, email, photo_url, is_admin) FROM stdin;
testuser	$2b$10$REv6t9K7EHqWCc76/SI37ODRvFfW/sPMflZpG9r4EdZPQt4QwwMf2	Joel	Burton	joel@joelburton.com	\N	f
\.


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joel
--

SELECT pg_catalog.setval('public.jobs_id_seq', 2, true);


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: joel
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (username, job_id);


--
-- Name: companies companies_name_key; Type: CONSTRAINT; Schema: public; Owner: joel
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_name_key UNIQUE (name);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: joel
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (handle);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: joel
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: joel
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- Name: applications applications_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joel
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;


--
-- Name: applications applications_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joel
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON DELETE CASCADE;


--
-- Name: jobs jobs_company_handle_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joel
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_company_handle_fkey FOREIGN KEY (company_handle) REFERENCES public.companies(handle) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

