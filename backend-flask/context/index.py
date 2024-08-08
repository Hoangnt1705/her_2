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

resume_english_functions =[
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
                        "description": "Personal information including name, birthday, contact details, and address.",
                        "properties": {
                            "name": {"type": "string"},
                            "email": {"type": "string"},
                            "birthday": {"type": "string"},
                            "phone": {"type": "string"},
                            "address": {"type": "string"},
                            "zipcode": {"type": "number"},

                        },
                        "required": ["name", "email", "phone", "address"]
                    },
                    "education": {
                        "type": "array",
                        "description": "Educational background including degrees, institutions, and other relevant academic details such as scores, coursework, and thesis information. Start with the most recent education and include details that are pertinent to the job application.",
                        "items": {
                            "type": "object",
                            "properties": {
                                "institution": {
                                    "type": "string",
                                    "description": "The name of the educational institution where the degree was obtained."
                                },
                                "degree": {
                                    "type": "string",
                                    "description": "The degree obtained by the user, including concentration if applicable."
                                },
                                "scores": {
                                    "type": "string",
                                    "description": "Include GPA, SAT/ACT scores, or other academic scores if requested by the employer or if relevant to the application."
                                },
                                "thesis": {
                                    "type": "string",
                                },
                                "relevant_coursework": {
                                    "type": "string",
                                    "description": "List relevant coursework that is applicable to the position being applied for. This can also include awards and honors."
                                },
                                "duration": {
                                    "type": "string",
                                    "description": "The graduation date or the years attended, formatted as Month Year – Month Year. If the month is not provided, generate any month. The year is required."
                                },
                                "location": {
                                    "type": "string",
                                    "description": "The city and state (or city and country for international institutions) where the educational institution is located."
                                }
                            },
                            "required": ["degree", "institution", "duration", "location"]
                        }
                    },
                    "experience": {
                        "type": "array",
                        "description": "Work experience including position titles, companies, durations, and locations. Describe each position starting with your most recent one, highlighting your experience, skills, and resulting outcomes. Use bullet points or paragraphs, begin each line with an action verb, and quantify achievements where possible.",
                        "items": {
                            "type": "object",
                            "properties": {
                                "organization": {
                                    "type": "string",
                                    "description": "The name of the organization where the position was held."
                                },
                                "position_title": {
                                    "type": "string",
                                    "description": "The title or designation of the position held by the user."
                                },
                                "duration": {
                                    "type": "string",
                                    "description": "The time period during which the position was held, formatted as Month Year – Month Year. If the month is not provided, generate any month. The year is required."
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
                            "required": ["position_title", "organization", "duration", "location"]
                        }
                    },
                    "leadership_and_actives": {
                        "type": "array",
                        "description": "A list of leadership roles and activities the user has participated in. This section can include positions held in various organizations, highlighting responsibilities, achievements, and specific projects or activities. It can be formatted similarly to the Experience section and may be prioritized above the Experience section if highly relevant to the job application.",
                        "items": {
                            "type": "object",
                            "properties": {
                                "organization": {
                                    "type": "string",
                                    "description": "The name of the organization where the leadership role was held."
                                },
                                "role": {
                                    "type": "string",
                                    "description": "The specific leadership role or title held by the user."
                                },
                                "duration": {
                                    "type": "string",
                                    "description": "The time period during which the leadership role was held, formatted as Month Year – Month Year. If the month is not provided, generate any month. The year is required."
                                },
                                "description": {
                                    "type": "array",
                                    "description": "A list of descriptions detailing the responsibilities, achievements, projects, and activities associated with the leadership role. Use different action verbs to highlight specific contributions and impact.",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                "location": {
                                    "type": "string",
                                    "description": "The city and state where the organization is located."
                                },
                                "projects": {
                                    "type": "array",
                                    "description": "A list of specific projects or activities the user participated in while holding the leadership role. This should highlight major initiatives and their impact.",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "required": ["role", "organization", "duration", "location", "description", "projects"]
                        }
                    },
                    "skills": {
                        "type": "array",
                        "description": "A list of skills relevant to the job. Be consistent presenting data. Use either numerals or words but not both",
                        "items": {
                            "type": "object",
                            "properties": {
                                "interests": {
                                    "type": "array",
                                    "description": "A list of activities and hobbies that the user enjoys. These interests can serve as potential conversation starters during an interview and provide insight into the user's personality and lifestyle.",
                                    "items": {
                                            "type": "string"
                                    }
                                },
                                "language": {
                                    "type": "array",
                                    "description": "List foreign languages and your level of fluency",
                                    "items": {
                                            "type": "string"
                                    }
                                },
                                "laboratory": {
                                    "type": "array",
                                    "description": "List scientific, research lab techniques or tools. If Applicable",
                                    "items": {
                                            "type": "string"
                                    }
                                },
                                "technical": {
                                    "type": "array",
                                    "description": "List computer software and programming languages",
                                    "items": {
                                            "type": "string"
                                    }
                                },
                            },
                            "required": ["technical", "language", "laboratory", "interests"]
                        }
                    },
                },
                "required": ["personal_info", "education", "experience", "leadership_and_actives", "skills"]
            }
        }
    }
]

resume_vietnamese_language_functions = [
    {
        "type": "function",
        "function": {
            "name": "create_resume",
            "description": "Sử dụng chức năng này để tạo một bản lý lịch dựa trên thông tin đầu vào của người dùng theo các hướng dẫn đã cung cấp.",
            "parameters": {
                "type": "object",
                "properties": {
                    "personal_info": {
                        "type": "object",
                        "description": "Thông tin cá nhân bao gồm tên, ngày sinh, chi tiết liên hệ và địa chỉ.",
                        "properties": {
                            "name": {"type": "string"},
                            "email": {"type": "string"},
                            "birthday": {"type": "string"},
                            "phone": {"type": "string"},
                            "address": {"type": "string"},
                            "zipcode": {"type": "number"},
                        },
                        "required": ["name", "email", "phone", "address"]
                    },
                    "education": {
                        "type": "array",
                        "description": "Nền tảng giáo dục bao gồm bằng cấp, cơ sở giáo dục và các chi tiết học thuật liên quan khác như điểm số, khóa học và thông tin luận văn. Bắt đầu với giáo dục gần đây nhất và bao gồm các chi tiết liên quan đến đơn xin việc.",
                        "items": {
                            "type": "object",
                            "properties": {
                                "institution": {
                                    "type": "string",
                                    "description": "Tên cơ sở giáo dục nơi đạt được bằng cấp."
                                },
                                "degree": {
                                    "type": "string",
                                    "description": "Bằng cấp mà người dùng đã đạt được, bao gồm chuyên ngành nếu có."
                                },
                                "scores": {
                                    "type": "string",
                                    "description": "Bao gồm GPA, điểm SAT/ACT hoặc các điểm học thuật khác nếu nhà tuyển dụng yêu cầu hoặc nếu có liên quan đến đơn xin việc."
                                },
                                "thesis": {
                                    "type": "string",
                                },
                                "relevant_coursework": {
                                    "type": "string",
                                    "description": "Liệt kê các khóa học liên quan đến vị trí đang ứng tuyển. Điều này cũng có thể bao gồm các giải thưởng và danh dự."
                                },
                                "duration": {
                                    "type": "string",
                                    "description": "Ngày tốt nghiệp hoặc các năm học, định dạng là Tháng Năm – Tháng Năm. Nếu không có tháng, tạo bất kỳ tháng nào. Năm là bắt buộc."
                                },
                                "location": {
                                    "type": "string",
                                    "description": "Thành phố và tiểu bang (hoặc thành phố và quốc gia đối với các cơ sở quốc tế) nơi cơ sở giáo dục nằm."
                                }
                            },
                            "required": ["degree", "institution", "duration", "location"]
                        }
                    },
                    "experience": {
                        "type": "array",
                        "description": "Kinh nghiệm làm việc bao gồm các chức danh, công ty, thời gian và địa điểm. Mô tả từng vị trí bắt đầu từ vị trí gần đây nhất, nhấn mạnh kinh nghiệm, kỹ năng và kết quả đạt được. Sử dụng các dấu đầu dòng hoặc đoạn văn, bắt đầu mỗi dòng bằng một động từ hành động và định lượng thành tựu nếu có thể.",
                        "items": {
                            "type": "object",
                            "properties": {
                                "organization": {
                                    "type": "string",
                                    "description": "Tên tổ chức nơi giữ vị trí."
                                },
                                "position_title": {
                                    "type": "string",
                                    "description": "Chức danh hoặc chức vụ của người dùng."
                                },
                                "duration": {
                                    "type": "string",
                                    "description": "Khoảng thời gian giữ vị trí, định dạng là Tháng Năm – Tháng Năm. Nếu không có tháng, tạo bất kỳ tháng nào. Năm là bắt buộc."
                                },
                                "description": {
                                    "type": "array",
                                    "description": "Danh sách các điểm hoặc đoạn văn mô tả kinh nghiệm, kỹ năng và kết quả đạt được của người dùng trong vị trí đó. Bắt đầu mỗi dòng bằng một động từ hành động và bao gồm các chi tiết để giúp người đọc hiểu được thành tựu, kỹ năng, kiến thức, khả năng hoặc thành tích của người dùng. Định lượng kết quả nếu có thể và tránh sử dụng đại từ nhân xưng.",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                "location": {
                                    "type": "string",
                                    "description": "Thành phố và tiểu bang nơi tổ chức nằm."
                                }
                            },
                            "required": ["position_title", "organization", "duration", "location"]
                        }
                    },
                    "leadership_and_actives": {
                        "type": "array",
                        "description": "Danh sách các vai trò lãnh đạo và hoạt động mà người dùng đã tham gia. Phần này có thể bao gồm các vị trí đã giữ trong các tổ chức khác nhau, nhấn mạnh trách nhiệm, thành tựu và các dự án hoặc hoạt động cụ thể. Có thể định dạng tương tự như phần Kinh nghiệm và có thể được ưu tiên hơn phần Kinh nghiệm nếu rất liên quan đến đơn xin việc.",
                        "items": {
                            "type": "object",
                            "properties": {
                                "organization": {
                                    "type": "string",
                                    "description": "Tên tổ chức nơi giữ vai trò lãnh đạo."
                                },
                                "role": {
                                    "type": "string",
                                    "description": "Vai trò lãnh đạo cụ thể hoặc chức vụ mà người dùng giữ."
                                },
                                "duration": {
                                    "type": "string",
                                    "description": "Khoảng thời gian giữ vai trò lãnh đạo, định dạng là Tháng Năm – Tháng Năm. Nếu không có tháng, tạo bất kỳ tháng nào. Năm là bắt buộc."
                                },
                                "description": {
                                    "type": "array",
                                    "description": "Danh sách các mô tả chi tiết về trách nhiệm, thành tựu, dự án và hoạt động liên quan đến vai trò lãnh đạo. Sử dụng các động từ hành động khác nhau để làm nổi bật các đóng góp và tác động cụ thể.",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                "location": {
                                    "type": "string",
                                    "description": "Thành phố và tiểu bang nơi tổ chức nằm."
                                },
                                "projects": {
                                    "type": "array",
                                    "description": "Danh sách các dự án hoặc hoạt động cụ thể mà người dùng đã tham gia khi giữ vai trò lãnh đạo. Điều này nên làm nổi bật các sáng kiến lớn và tác động của chúng.",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "required": ["role", "organization", "duration", "location", "description", "projects"]
                        }
                    },
                    "skills": {
                        "type": "array",
                        "description": "Danh sách các kỹ năng liên quan đến công việc. Trình bày dữ liệu nhất quán. Sử dụng số hoặc từ nhưng không sử dụng cả hai.",
                        "items": {
                            "type": "object",
                            "properties": {
                                "interests": {
                                    "type": "array",
                                    "description": "Danh sách các hoạt động và sở thích mà người dùng yêu thích. Những sở thích này có thể trở thành chủ đề bắt chuyện tiềm năng trong một cuộc phỏng vấn và cung cấp cái nhìn về tính cách và lối sống của người dùng.",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                "language": {
                                    "type": "array",
                                    "description": "Liệt kê các ngoại ngữ và mức độ thông thạo của bạn.",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                "laboratory": {
                                    "type": "array",
                                    "description": "Liệt kê các kỹ thuật hoặc công cụ phòng thí nghiệm khoa học, nghiên cứu. Nếu có.",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                "technical": {
                                    "type": "array",
                                    "description": "Liệt kê các phần mềm máy tính và ngôn ngữ lập trình.",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                            },
                            "required": ["technical", "language", "laboratory", "interests"]
                        }
                    },
                },
                "required": ["personal_info", "education", "experience", "leadership_and_actives", "skills"]
            }
        }
    }
]