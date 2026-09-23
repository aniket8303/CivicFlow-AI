from app.services.priority_service import calculate_priority


print("Title Case:")
print("Critical:", calculate_priority("Critical"))
print("High:", calculate_priority("High"))
print("Medium:", calculate_priority("Medium"))
print("Low:", calculate_priority("Low"))


print("\nUpper Case:")
print("CRITICAL:", calculate_priority("CRITICAL"))
print("HIGH:", calculate_priority("HIGH"))
print("MEDIUM:", calculate_priority("MEDIUM"))
print("LOW:", calculate_priority("LOW"))