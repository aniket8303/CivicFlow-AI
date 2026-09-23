def calculate_priority(severity: str) -> str:
    severity = severity.upper()
    if severity == "CRITICAL":
        return "P1"
    if severity == "HIGH":
        return "P2"
    if severity == "MEDIUM":
        return "P3"
    return "P3"