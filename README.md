# NewzOne

**NewzOne** is a dynamic and user-centric news aggregation platform designed to keep users informed with the latest headlines across various categories such as business, entertainment, general news, health, science, sports, and technology. The platform leverages React for a seamless and interactive user experience and integrates with the NewsAPI to fetch real-time news articles from reliable sources.

## Features

- **Category-Specific News**: Navigate through Business, Entertainment, General, Health, Science, Sports, and Technology news.
- **Infinite Scroll**: Continuous news article loading as you scroll.
- **Responsive Design**: Mobile-friendly interface using Bootstrap.
- **Real-Time News Updates**: Fetches the latest articles from NewsAPI.
- **News Summaries and Detailed Views**: Quick summaries with options to read more.
- **Customizable Page Size**: Adjust the number of articles displayed per page.
- **Article Metadata**: Information such as author, date, and source for context.
- **Loading Spinner**: Visual feedback during content fetching.

## Technologies Used

- **Frontend**: React
- **Styling**: Bootstrap
- **Routing**: React Router
- **API**: NewsAPI

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/newzone.git
    cd newzone
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Run the app**:
    ```sh
    npm start
    ```

## Component Structure

- **App Component**: Manages the main structure and routing.
- **Navbar Component**: Navigation links to different news categories.
- **News Component**: Fetches and displays news articles, handles infinite scroll.
- **NewsItem Component**: Represents individual news articles with metadata.
- **Spinner Component**: Displays loading spinner during data fetch.

## API Key Setup

1. Obtain an API key from [NewsAPI](https://newsapi.org/).
2. Create a `.env` file in the root directory of your project:
    ```sh
    REACT_APP_NEWS_API_KEY=your_api_key_here
    ```

## Example .env File

```plaintext
REACT_APP_NEWS_API_KEY=your_api_key_here
