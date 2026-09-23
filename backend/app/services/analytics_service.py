from sqlalchemy.orm import Session
from sqlalchemy import func
from math import radians, sin, cos, sqrt, atan2

from app.models.report_model import Report

def get_category_counts(db: Session):

    results = (
        db.query(
            Report.category,
            func.count(Report.id)
        )
        .group_by(Report.category)
        .all()
    )

    return [
        {
            "name": category,
            "count": count
        }
        for category, count in results
    ]

def get_severity_counts(db: Session):

    normalized_severity = func.upper(Report.severity)

    results = (
        db.query(
            normalized_severity,
            func.count(Report.id)
        )
        .group_by(normalized_severity)
        .all()
    )

    return [
        {
            "name": severity,
            "count": count
        }
        for severity, count in results
    ]

def get_priority_counts(db: Session):

    normalized_priority = func.upper(Report.priority)

    results = (
        db.query(
            normalized_priority,
            func.count(Report.id)
        )
        .group_by(normalized_priority)
        .all()
    )

    return [
        {
            "name": priority,
            "count": count
        }
        for priority, count in results
    ]

def get_analytics_overview(db: Session):

    categories = get_category_counts(db)
    severity = get_severity_counts(db)
    priority = get_priority_counts(db)
    locations = get_location_counts(db)

    return {
        "categories": categories,
        "severity": severity,
        "priority": priority,
        "locations": locations
    }

def get_location_counts(db: Session):

    results = (
        db.query(
            Report.location,
            func.count(Report.id)
        )
        .group_by(Report.location)
        .all()
    )

    return [
        {
            "name": location,
            "count": count
        }
        for location, count in results
    ]

def get_geographic_reports(db: Session):

    results = (
        db.query(
            Report.id,
            Report.title,
            Report.latitude,
            Report.longitude,
            Report.severity,
            Report.priority
        )
        .filter(
            Report.latitude.isnot(None),
            Report.longitude.isnot(None)
        )
        .all()
    )

    return [
        {
            "id": report_id,
            "title": title,
            "latitude": latitude,
            "longitude": longitude,
            "severity": severity,
            "priority": priority
        }
        for (
            report_id,
            title,
            latitude,
            longitude,
            severity,
            priority
        ) in results
    ]

def get_hotspots(db: Session):

    reports = (
        db.query(
            Report.id,
            Report.latitude,
            Report.longitude
        )
        .filter(
            Report.latitude.isnot(None),
            Report.longitude.isnot(None)
        )
        .all()
    )

    hotspot_radius = 200

    hotspots = []
    processed = set()

    for report in reports:

        if report.id in processed:
            continue

        nearby_reports = []

        for other_report in reports:

            distance = calculate_distance(
                report.latitude,
                report.longitude,
                other_report.latitude,
                other_report.longitude
            )

            if distance <= hotspot_radius:
                nearby_reports.append(other_report)

        if len(nearby_reports) >= 2:

            for nearby_report in nearby_reports:
                processed.add(nearby_report.id)

            avg_latitude = sum(
                r.latitude for r in nearby_reports
            ) / len(nearby_reports)

            avg_longitude = sum(
                r.longitude for r in nearby_reports
            ) / len(nearby_reports)

            hotspots.append({
                "latitude": avg_latitude,
                "longitude": avg_longitude,
                "count": len(nearby_reports)
            })

    return hotspots

def calculate_distance(lat1, lon1, lat2, lon2):

    earth_radius = 6371000

    lat1 = radians(lat1)
    lat2 = radians(lat2)

    delta_lat = radians(lat2 - lat1)
    delta_lon = radians(lon2 - lon1)

    a = (
        sin(delta_lat / 2) ** 2
        + cos(lat1)
        * cos(lat2)
        * sin(delta_lon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return earth_radius * c