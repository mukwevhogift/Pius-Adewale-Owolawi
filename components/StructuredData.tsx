export default function StructuredData() {
    // Person schema — the primary entity
    const personSchema = {
        "@type": "Person",
        "@id": "https://www.piusowolawi.com/#person",
        "name": "Prof. Pius Adewale Owolawi",
        "alternateName": [
            "Pius Adewale Owolawi",
            "Prof Pius Owolawi",
            "pro pius owolawi adewale",
            "P.A. Owolawi",
            "PA Owolawi",
            "Professor Owolawi"
        ],
        "honorificPrefix": "Prof.",
        "honorificSuffix": "PhD, ECSA, MIEEE, SAIEE",
        "givenName": "Pius Adewale",
        "familyName": "Owolawi",
        "jobTitle": [
            "Professor of Telecommunication and Information Technology",
            "Assistant Dean for Industry Liaison, Special Projects, and Work Integrated Learning",
            "Head of Department of Computer Systems Engineering"
        ],
        "description":
            "Prof. Pius Adewale Owolawi is a Distinguished Professor and leading AI & 4IR researcher at Tshwane University of Technology (TUT), South Africa. With over 200 peer-reviewed publications, 2000+ citations, and R94M+ in research funding, he is ranked among the Top 500 African Researchers. His expertise spans Artificial Intelligence, Machine Learning, Wireless Communications, IoT, Renewable Energy Systems, Computer Vision, and Robotics.",
        "url": "https://www.piusowolawi.com",
        "image": {
            "@type": "ImageObject",
            "url": "https://www.piusowolawi.com/img/prof-owolawi.jpg",
            "width": 1200,
            "height": 630,
            "caption": "Prof. Pius Adewale Owolawi – Leading AI & 4IR Researcher"
        },
        "email": "OwolawiPA@tut.ac.za",
        "telephone": "+27829750484",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Block 13, Room 153, Tshwane University of Technology, Soshanguve South Campus",
            "addressLocality": "Pretoria",
            "addressRegion": "Gauteng",
            "postalCode": "0152",
            "addressCountry": "ZA"
        },
        "worksFor": {
            "@type": "EducationalOrganization",
            "@id": "https://www.tut.ac.za/#org",
            "name": "Tshwane University of Technology",
            "url": "https://www.tut.ac.za",
            "department": {
                "@type": "Organization",
                "name": "Department of Computer Systems Engineering, Faculty of Information and Communication Technology"
            }
        },
        "affiliation": [
            {
                "@type": "EducationalOrganization",
                "name": "Tshwane University of Technology",
                "url": "https://www.tut.ac.za"
            }
        ],
        "alumniOf": [
            {
                "@type": "EducationalOrganization",
                "name": "University of KwaZulu-Natal",
                "sameAs": "https://www.ukzn.ac.za"
            },
            {
                "@type": "EducationalOrganization",
                "name": "Federal University of Technology, Akure (FUTA)",
                "sameAs": "https://www.futa.edu.ng"
            },
            {
                "@type": "EducationalOrganization",
                "name": "University of Texas at Austin",
                "sameAs": "https://www.utexas.edu"
            }
        ],
        "hasCredential": [
            {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "degree",
                "name": "PhD in Electronic Engineering",
                "recognizedBy": {
                    "@type": "EducationalOrganization",
                    "name": "University of KwaZulu-Natal"
                }
            },
            {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "professional",
                "name": "Professional Engineer (Pr. Eng.)",
                "recognizedBy": {
                    "@type": "Organization",
                    "name": "Engineering Council of South Africa (ECSA)"
                }
            }
        ],
        "hasOccupation": {
            "@type": "Occupation",
            "name": "Professor",
            "occupationLocation": {
                "@type": "Country",
                "name": "South Africa"
            },
            "occupationalCategory": "25-1021.00",
            "description": "Professor of Telecommunication and Information Technology specializing in AI, Machine Learning, and 4IR Innovation"
        },
        "knowsAbout": [
            "Artificial Intelligence",
            "Machine Learning",
            "Deep Learning",
            "Wireless Communications",
            "5G/6G Networks",
            "Internet of Things (IoT)",
            "Renewable Energy Systems",
            "Computer Vision",
            "Robotics",
            "Drone Technology",
            "4IR Innovation",
            "Smart Campus Systems",
            "Sensor Networks",
            "Radio Propagation",
            "Telecommunication Engineering"
        ],
        "award": [
            "Top 500 African Researchers – AD Scientific Index (2015–2021)",
            "Senior Researcher of the Year – TUT (2020)",
            "Senior Researcher of the Year – TUT (2018)",
            "Most Outstanding Researcher – TUT (2016)",
            "Senate Research Excellence Award – TUT (2016)",
            "Vice-Chancellor's Teaching Excellence Award – TUT (2015)",
            "Most Outstanding Researcher – TUT (2014)",
            "Most Outstanding Researcher – TUT (2012)"
        ],
        "memberOf": [
            {
                "@type": "Organization",
                "name": "Engineering Council of South Africa (ECSA)",
                "description": "Registered Professional Engineer"
            },
            {
                "@type": "Organization",
                "name": "Institute of Electrical and Electronics Engineers (IEEE)",
                "description": "Member (MIEEE)"
            },
            {
                "@type": "Organization",
                "name": "South African Institute of Electrical Engineers (SAIEE)",
                "description": "Senior Member"
            }
        ],
        "sameAs": [
            "https://scholar.google.com/citations?user=uxyoAbYAAAAJ&hl=en",
            "https://www.researchgate.net/profile/Pius-Owolawi",
            "https://www.linkedin.com/in/pius-owolawi/",
            "https://www.tut.ac.za"
        ],
        "nationality": {
            "@type": "Country",
            "name": "South Africa"
        }
    };

    // WebSite schema — helps Google identify the site
    const websiteSchema = {
        "@type": "WebSite",
        "@id": "https://www.piusowolawi.com/#website",
        "url": "https://www.piusowolawi.com",
        "name": "Prof. Pius Adewale Owolawi – Academic Portfolio",
        "description":
            "Official academic portfolio of Prof. Pius Adewale Owolawi, Distinguished Professor and AI & 4IR researcher at Tshwane University of Technology.",
        "publisher": { "@id": "https://www.piusowolawi.com/#person" },
        "inLanguage": "en"
    };

    // ProfilePage schema — tells Google this page is about a person
    const profilePageSchema = {
        "@type": "ProfilePage",
        "@id": "https://www.piusowolawi.com/#profilepage",
        "url": "https://www.piusowolawi.com",
        "name": "Prof. Pius Adewale Owolawi – Leading AI & 4IR Researcher",
        "description":
            "Academic portfolio and research profile of Prof. Pius Adewale Owolawi, Professor of Telecommunication and IT at Tshwane University of Technology.",
        "mainEntity": { "@id": "https://www.piusowolawi.com/#person" },
        "isPartOf": { "@id": "https://www.piusowolawi.com/#website" },
        "inLanguage": "en",
        "datePublished": "2024-01-01",
        "dateModified": "2026-03-19"
    };

    // Combine all schemas in a single @graph
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [personSchema, websiteSchema, profilePageSchema]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
