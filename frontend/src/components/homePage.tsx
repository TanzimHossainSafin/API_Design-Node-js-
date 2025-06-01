export default function HomePage() {
    const now = new Date();

    // Calculate UTC+6 time
    const utcPlus6 = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours() + 6, // Add 6 hours to current UTC hours
        now.getUTCMinutes(),
        now.getUTCSeconds(),
        now.getUTCMilliseconds()
      )
    );
    const currentHourInUTCPlus6 = utcPlus6.getUTCHours();

    let greeting;

    if (currentHourInUTCPlus6 >= 5 && currentHourInUTCPlus6 < 12) {
        greeting = "Good morning";
    } else if (currentHourInUTCPlus6 >= 12 && currentHourInUTCPlus6 < 17) { // 12 PM to 4:59 PM
        greeting = "Good afternoon";
    } else if (currentHourInUTCPlus6 >= 17 && currentHourInUTCPlus6 < 21) { // 5 PM to 8:59 PM
        greeting = "Good evening";
    } else { // Covers 9 PM (21) up to 4:59 AM
        greeting = "Happy night talk";
    }

    return (
        <div>
            <h1>{greeting}</h1>
        </div>
    );
}