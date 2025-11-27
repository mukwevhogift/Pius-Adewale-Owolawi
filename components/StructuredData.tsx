export default function StructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Prof. Pius Adewale Owolawi",
        "honorificPrefix": "Prof.",
        "givenName": "Pius Adewale",
        "familyName": "Owolawi",
        "jobTitle": "Assistant Dean for Industry Liaison, Special Projects, and Work Integrated Learning",
        "description": "Distinguished Professor and researcher specializing in AI, Machine Learning, Wireless Communications, and 4IR Innovation",
        "url": "https://piusowolawi.com",
        "image": "https://piusowolawi.com/img/prof-owolawi.jpg",
        "email": "OwolawiPA@tut.ac.za",
        "telephone": "+27829750484",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Block 13, Room 153, Tshwane University of Technology",
            "addressLocality": "Soshanguve, Pretoria",
            "addressCountry": "ZA"
        },
        "affiliation": {
            "@type": "Organization",
            "name": "Tshwane University of Technology",
            "url": "https://www.tut.ac.za"
        },
        "alumniOf": [
            {
                "@type": "Organization",
                "name": "University of KwaZulu-Natal",
                "sameAs": "https://www.ukzn.ac.za"
            },
            {
                "@type": "Organization",
                "name": "Federal University of Technology, Akure",
                "sameAs": "https://www.futa.edu.ng"
            },
            {
                "@type": "Organization",
                "name": "University of Texas at Austin",
                "sameAs": "https://www.utexas.edu"
            }
        ],
        "knowsAbout": [
            "Artificial Intelligence",
            "Machine Learning",
            "Wireless Communications",
            "Internet of Things",
            "Renewable Energy Systems",
            "Computer Vision",
            "Robotics",
            "4IR Innovation"
        ],
        "award": [
            "Top 500 African Researchers (2015-2021)",
            "Senior Researcher of the Year (2020, 2018)",
            "Most Outstanding Researcher (2016, 2014, 2012)",
            "Senate Research Excellence Award (2016)",
            "Vice-Chancellor's Teaching Excellence Award (2015)"
        ],
        "memberOf": [
            {
                "@type": "Organization",
                "name": "Engineering Council of South Africa (ECSA)"
            },
            {
                "@type": "Organization",
                "name": "Institute of Electrical and Electronics Engineers (IEEE)"
            },
            {
                "@type": "Organization",
                "name": "South African Institute of Electrical Engineers (SAIEE)"
            }
        ],
        "sameAs": [
            "https://scholar.google.com/citations?user=uxyoAbYAAAAJ&hl=en",
            "https://www.researchgate.net/profile/Pius-Owolawi",
            "https://www.linkedin.com/in/pius-owolawi"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
