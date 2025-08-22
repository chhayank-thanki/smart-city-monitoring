# Smart City Monitoring System

A web-based platform for **real-time urban issue tracking** and **emergency management**, aimed at improving citizen safety and city administration efficiency.

## 🚀 Features

- **Issue Reporting:** Citizens can report problems (e.g., infrastructure issues, garbage collection) with location details.
- **SOS Alerts:** Real-time SOS emergency alerts visible to administrators with map integration.
- **Admin Dashboard:** Manage and monitor all reported issues and SOS alerts on an interactive interface.
- **Map Visualization:** Plot SOS alert locations and reported issues on a live map (e.g., Google Maps/Leaflet).
- **MongoDB Integration:** Stores and manages all reports/alerts efficiently.
- **Responsive UI:** User-friendly design for both citizens and admins.

## 🛠 Tech Stack

- **Frontend:** React.js (Admin & Citizen Panel), TailwindCSS/Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose for schema modeling)
- **Maps:** Leaflet / Google Maps API
- **Authentication:** JWT-based (if implemented)



## ⚙️ Installation & Setup

### 1) Clone the repository:
```bash
git clone https://github.com/chhayank-thanki/visual-learning-assistant.git
cd visual-learning-assistant

```

### 2) setup node.js server
```bash
cd server
npm install
npm run dev
```

### 3) setup react client
```bash
cd ../client
npm install
npm start
```

### 4) setup Python Django API
```bash
cd ../python-api
pip install -r requirements.txt
python manage.py runserver
```

### 5) Environment variables in your server.env
```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret (if auth implemented)
```

🌟 Future Enhancements

Role-based access control (Admin vs Citizen)

AI-based pattern detection for recurring issues

Push notifications for emergency alerts

Integration with IoT sensors for automated monitoring


---

## 🙋‍♂️ Author

**Chhayank Thanki**  
LinkedIn: [@chhayank-thanki](https://www.linkedin.com/in/chhayank-thanki/)  
GitHub: [@chhayank-thanki](https://github.com/chhayank-thanki)

---
