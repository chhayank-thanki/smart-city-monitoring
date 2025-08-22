import os
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import time

load_dotenv()

RSS_URL = "https://sachet.ndma.gov.in/cap_public_website/rss/rss_india.xml"
BASE_URL = os.getenv("API_BASE_URL", "http://localhost:3000")
API_URL = f"{BASE_URL}/api/rss"

MAX_RETRIES = 3


def fetch_rss_feed(retries=0):
    """
    Fetch RSS Feed and Extract Alerts
    """
    try:
        print(f"[Scraper] Fetching RSS feed from: {RSS_URL} (Attempt {retries + 1})")
        response = requests.get(RSS_URL, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, "xml")
        items = soup.find_all("item")

        if not items:
            print("[Scraper] Unexpected RSS structure: No valid items found.")
            return []

        alerts = []
        for item in items:
            time_text = item.pubDate.text if item.pubDate else "Unknown Time"
            headline = item.title.text if item.title else "No Headline Available"
            link = item.link.text if item.link else "No Link Available"

            alerts.append({
                "time": time_text,
                "headline": headline,
                "link": link
            })

        print(f"[Scraper] Extracted {len(alerts)} alerts.")
        return alerts

    except requests.exceptions.RequestException as e:
        print(f"[Scraper] Error fetching RSS feed: {e}")

        if retries < MAX_RETRIES:
            print(f"[Scraper] Retrying... ({retries + 1}/{MAX_RETRIES})")
            time.sleep(2)
            return fetch_rss_feed(retries + 1)

        return []


def store_alerts(alerts):
    """
    Store Alerts in Database via API
    """
    print(f"[Scraper] Attempting to store {len(alerts)} alerts")

    for alert in alerts:
        try:
            response = requests.post(API_URL, json=alert)

            if response.status_code == 201:
                print(f"[Scraper] ✅ Alert stored: {alert['headline']}")
            elif response.status_code == 409:
                # Already exists
                pass
            else:
                print(f"[Scraper] ❌ Failed to store alert: {alert['headline']} (Status {response.status_code})")

        except requests.exceptions.RequestException as e:
            print(f"[Scraper] ❌ Error storing alert: {alert['headline']} | {e}")


def scrape_rss_feed():
    """
    Scrape RSS and Store in DB
    """
    alerts = fetch_rss_feed()
    if alerts:
        store_alerts(alerts)
    else:
        print("[Scraper] No alerts to store.")


if _name_ == "_main_":
    scrape_rss_feed()