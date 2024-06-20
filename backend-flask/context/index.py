tools = [
    {
        "type": "function",
        "function": {
            "name": "parse-recruiters",
            "description": "You are a parser that takes in recruiter messages and converts them in to a JSON object",
            "parameters": {
                "type": "object",
                "properties": {
                    "currency_format": {
                        "type": "string",
                        "enum": [
                            "AFN",
                            "ALL",
                            "DZD",
                            "AOA",
                            "ARS",
                            "AMD",
                            "AUD",
                            "AZN",
                            "BSD",
                            "BHD",
                            "BDT",
                            "BBD",
                            "BYN",
                            "BZD",
                            "BMD",
                            "BTN",
                            "BOB",
                            "BAM",
                            "BWP",
                            "BRL",
                            "GBP",
                            "BND",
                            "BGN",
                            "BIF",
                            "KHR",
                            "CAD",
                            "CVE",
                            "KYD",
                            "XAF",
                            "CLP",
                            "CNY",
                            "COP",
                            "KMF",
                            "CDF",
                            "CRC",
                            "HRK",
                            "CUP",
                            "CZK",
                            "DKK",
                            "DJF",
                            "DOP",
                            "XCD",
                            "EGP",
                            "ERN",
                            "SZL",
                            "ETB",
                            "EUR",
                            "GMD",
                            "GEL",
                            "GHS",
                            "GTQ",
                            "GNF",
                            "GYD",
                            "HTG",
                            "HNL",
                            "HKD",
                            "HUF",
                            "ISK",
                            "INR",
                            "IDR",
                            "IRR",
                            "IQD",
                            "ILS",
                            "JMD",
                            "JPY",
                            "JOD",
                            "KZT",
                            "KES",
                            "KWD",
                            "KGS",
                            "LAK",
                            "LBP",
                            "LSL",
                            "LRD",
                            "LYD",
                            "MOP",
                            "MKD",
                            "MGA",
                            "MWK",
                            "MYR",
                            "MVR",
                            "MRU",
                            "MUR",
                            "MXN",
                            "MDL",
                            "MNT",
                            "MAD",
                            "MZN",
                            "MMK",
                            "NAD",
                            "NPR",
                            "ANG",
                            "TWD",
                            "NZD",
                            "NIO",
                            "NGN",
                            "KPW",
                            "NOK",
                            "OMR",
                            "PKR",
                            "PAB",
                            "PGK",
                            "PYG",
                            "PEN",
                            "PHP",
                            "PLN",
                            "QAR",
                            "RON",
                            "RUB",
                            "RWF",
                            "SHP",
                            "WST",
                            "STN",
                            "SAR",
                            "RSD",
                            "SCR",
                            "SLL",
                            "SGD",
                            "SBD",
                            "SOS",
                            "ZAR",
                            "KRW",
                            "SSP",
                            "LKR",
                            "SDG",
                            "SRD",
                            "SEK",
                            "CHF",
                            "SYP",
                            "TJS",
                            "TZS",
                            "THB",
                            "TOP",
                            "TTD",
                            "TND",
                            "TRY",
                            "TMT",
                            "UGX",
                            "UAH",
                            "AED",
                            "USD",
                            "UYU",
                            "UZS",
                            "VUV",
                            "VES",
                            "VND",
                            "XOF",
                            "YER",
                            "ZMW",
                            "ZWL"
                        ],
                        "description": "Monetary unit of salary. If no valid currency is found, it can be determined based on the input's language or country reference"
                    },
                    "unit_of_time_for_holidays": {
                        "type": "number",
                        "enum": ["day", "month", "year"],
                        "description": "The holidays during the year must be expressed in time units appropriate to their duration"
                    },
                    "unit_of_time_for_position_experience": {
                        "type": "string",
                        "enum": ["year"],
                        "description": "Position experience must be expressed in time units appropriate to the duration of the experience",
                    },
                    "is_remote": {
                        "type": "boolean",
                        "description": "whether or not the opportunity is remote",
                    },
                    "salary_min": {
                        "type": "number",
                        "description": "The minimum salary",
                    },
                    "salary_max": {
                        "type": "number",
                        "description": "The maximum salary",
                    },
                    "contract": {
                        "type": "boolean",
                        "description": "Whether or not the position is a contract/freelance position, or a full-time role",
                    },
                    "role_name": {
                        "type": "string",
                        "description": "The name of the role, if possible",
                    },
                    "benefits": {
                        "type": "string",
                        "description": "Any miscellaneous benefits",
                    },
                    "notes": {
                        "type": "string",
                        "description": "Include any additional information that may be noteworthy, such as a summary of specific qualifications, skills, and attributes that an employer seeks in a potential candidate for the job position",
                    },
                    "experience": {
                        "type": "number",
                        "description": "If added, the amount of experience required in years",
                    },
                    "recruiter": {
                        "type": "string",
                        "description": "The name of the recruiter",
                    },
                    "next_step": {
                        "type": "string",
                        "description": "The suggested next step in the recruitment process, usually a call or interview"
                    },
                    "holidays": {
                        "type": "number",
                        "description": "The holiday during the year"
                    },
                    "city": {
                        "type": "string",
                        "description": "The city"
                    },
                    "country": {
                        "type": "string",
                        "description": "The country."
                    },
                    "title": {
                        "type": "string",
                        "description": "Create a title for the prompt."
                    }
                },
                "required": ["is_remote", "salary_min", "salary_max", "contract", "role_name", "benefits", "notes", "experience",
                             "recruiter", "next_step", "holiday", "city", "country", "title",
                             "unit_of_time_for_position_experience", "unit_of_time_for_holidays", "currency_format",
                             "candidate_requirements"],
            },
        }
    }
]

resume_functions = [
    {
        "type": "function",
        "function": {
            "name": "create_resume",
            "description": "Use this function to create a resume based on the user's input following the provided guidelines.",
            "parameters": {
                "type": "object",
                "properties": {
                    "personal_info": {
                        "type": "object",
                        "description": "Personal information including name, contact details, and address.",
                        "properties": {
                            "name": {"type": "string"},
                            "email": {"type": "string"},
                            "phone": {"type": "string"},
                            "address": {"type": "string"}
                        },
                        "required": ["name", "email", "phone"]
                    },
                    "education": {
                        "type": "array",
                        "description": "Educational background including degrees, institutions, and other relevant academic details such as scores, coursework, and thesis information. Start with the most recent education and include details that are pertinent to the job application.",
                        "items": {
                            "type": "object",
                            "properties": {
                                "degree": {
                                    "type": "string",
                                    "description": "The degree obtained by the user, including concentration if applicable."
                                },
                                "scores": {
                                    "type": "string",
                                    "description": "Include GPA, SAT/ACT scores, or other academic scores if requested by the employer or if relevant to the application."
                                },
                                "institution": {
                                    "type": "string",
                                    "description": "The name of the educational institution where the degree was obtained."
                                },
                                "relevant_coursework": {
                                    "type": "string",
                                    "description": "List relevant coursework that is applicable to the position being applied for. This can also include awards and honors."
                                },
                                "year": {
                                    "type": "string",
                                    "description": "The graduation date or the years attended, formatted as Month Year – Month Year."
                                },
                                "location": {
                                    "type": "string",
                                    "description": "The city and state (or city and country for international institutions) where the educational institution is located."
                                }
                            },
                            "required": ["degree", "institution", "year", "location"]
                        }
                    },
                    "experience": {
                        "type": "array",
                        "description": "Work experience including position titles, companies, durations, and locations. Describe each position starting with your most recent one, highlighting your experience, skills, and resulting outcomes. Use bullet points or paragraphs, begin each line with an action verb, and quantify achievements where possible.",
                        "items": {
                            "type": "object",
                            "properties": {
                                "company": {
                                    "type": "string",
                                    "description": "The name of the organization where the position was held."
                                },
                                "position_title": {
                                    "type": "string",
                                    "description": "The title or designation of the position held by the user."
                                },
                                "duration": {
                                    "type": "string",
                                    "description": "The time period during which the position was held, formatted as Month Year – Month Year."
                                },
                                "description": {
                                    "type": "array",
                                    "description": "A list of bullet points or paragraphs describing the user's experience, skills, and resulting outcomes in the position. Begin each line with an action verb and include details to help the reader understand the user's accomplishments, skills, knowledge, abilities, or achievements. Quantify results where possible and avoid personal pronouns.",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                "location": {
                                    "type": "string",
                                    "description": "The city and state where the organization is located."
                                }
                            },
                            "required": ["position_title", "company", "duration", "location"]
                        }
                    },
                    "leadership": {
                        "type": "array",
                        "description": "A list of leadership roles and activities the user has participated in. This section can include positions held in various organizations, highlighting responsibilities and achievements. It can be formatted similarly to the Experience section and may be prioritized above the Experience section if highly relevant to the job application.",
                        "items": {
                            "type": "object",
                            "properties": {
                                "company": {
                                    "type": "string",
                                    "description": "The name of the organization where the leadership role was held."
                                },
                                "role": {
                                    "type": "string",
                                    "description": "The specific leadership role or title held by the user."
                                },
                                "duration": {
                                    "type": "string",
                                    "description": "The time period during which the leadership role was held, formatted as Month Year – Month Year."
                                },
                                "description": {
                                    "type": "array",
                                    "description": "A list of descriptions detailing the responsibilities, achievements, and activities associated with the leadership role. Use different action verbs to highlight specific contributions and impact.",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                "location": {
                                    "type": "string",
                                    "description": "The city and state where the organization is located."
                                }
                            },
                            "required": ["role", "company", "duration", "location"]
                        }
                    },
                    "skills": {
                        "type": "array",
                        "description": "A list of skills relevant to the job. Be consistent presenting data. Use either numerals or words but not both",
                        "items": {"type": "string"}
                    },
                    "interests": {
                        "type": "array",
                        "description": "A list of activities and hobbies that the user enjoys. These interests can serve as potential conversation starters during an interview and provide insight into the user's personality and lifestyle.",
                        "items": {
                            "type": "string"
                        }
                    }
                },
                "required": ["personal_info", "education", "experience", "leadership", "interests", "skills"]
            }
        }
    }
]
