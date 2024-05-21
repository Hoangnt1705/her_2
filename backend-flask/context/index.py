tools = [
    {
        "type": "function",
        "function": {
            "name": "parse-recruiters",
            "description": "You are a parser that takes in recruiter messages and converts them in to a JSON object",
            "parameters": {
                "type": "object",
                "properties": {
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
                        "description": "Any extra information you see that may be of note",
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
                "required": ["is_remote", "salary_min", "salary_max", "contract", "role_name", "benefits", "notes", "experience", "recruiter", "next_step", "holiday", "city", "country", "title"],
            },
        }
    }
]
