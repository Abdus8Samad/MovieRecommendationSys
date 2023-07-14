# Movie Recommendation System

The proliferation of data collection has ushered in a new era of information, prompting the emergence of Recommendation Systems. These systems play a crucial role in information filtering, enhancing search result quality, and providing users with more relevant items based on their search queries and browsing history.

Recommendation Systems employ algorithms to forecast user ratings or preferences for specific items. Nearly every prominent technology company has implemented such systems in various capacities. For instance, Amazon employs them to suggest products to customers, YouTube relies on them to determine the next video to play in autoplay, and Facebook employs them to offer page recommendations and suggest people to follow. Additionally, companies like Netflix and Spotify heavily rely on the efficacy of their recommendation engines for business growth and success.

## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
- [Data](#data)
- [Basis of System](#basis-of-system)
- [Algorithms](#algorithms)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)

## Introduction

The movie recommendation system is built to assist users in discovering new movies based on their preferences and the preferences of other users with similar tastes. By analyzing historical data, the system learns patterns and makes predictions to suggest movies that users are likely to enjoy. This README provides an overview of the system, its installation instructions, and details about the underlying algorithms and evaluation metrics.

## Usage

Once the application is running, you can use the movie recommendation system by following these steps:

Website
![](https://github.com/Abdus8Samad/MovieRecommendationSys/blob/main/images/2.jpg?raw=true)

1. Search the Movie Title/Name.

![](https://github.com/Abdus8Samad/MovieRecommendationSys/blob/main/images/1.jpg?raw=true)
   
3. System will recommend you top 10 movies related to your search.

![](https://github.com/Abdus8Samad/MovieRecommendationSys/blob/main/images/3.jpg?raw=true)

## Data

The movie recommendation system relies on a dataset of movies and user preferences. The dataset contains information such as movie titles, genres, release dates, and user ratings. The data is used for training the recommendation system and used Machine Learning Techniques for evaluation.

Dataset Used:
- [TMDB 5000 Movie Dataset](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata)
- [The Movies Dataset](https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset)

## Basis of System

The movie recommendation system employs various machine learning techniques to generate accurate recommendations. Some of the algorithms used include:

- Demographic Filtering: Demographic filtering is a method of information filtering that considers demographic attributes, such as age, gender, location, or income, to tailor content or recommendations to specific user groups.

  ![Demographic](https://github.com/Abdus8Samad/MovieRecommendationSys/blob/main/images/a.jpeg?raw=true)

- Content-Based Filtering: This approach recommends movies based on their content features, such as genres, actors, directors, and plot summaries. It finds similarities between movies to suggest items with similar attributes.

  ![content-based](https://github.com/Abdus8Samad/MovieRecommendationSys/blob/main/images/b.jpeg?raw=true)

## Algorithms

### 1. IMDB Weighted Average [Demographic Filtering]
  
The IMDB weighted average is a calculation used to determine the overall rating of a movie or TV show on the IMDb platform. It aims to provide a fair representation of the overall user rating by taking into account the number of votes received for the title.

**Steps to follow:**

1. Collect the number of votes (V) and the average rating (R) for the movie or TV show.
1. Define a minimum number of votes (m) required for the title to be considered eligible for calculation. This threshold helps filter out titles with a small number of votes 
1. that may not accurately reflect the overall quality.
1. Calculate the weighted average (WR) using the formula:

Formula: ```WR = ( (V / (V + m)) * R ) + ( (m / (V + m)) * C )```

Here, C represents a predetermined constant value. It serves as a reference rating, which is typically set to the average rating across all titles on IMDb. The constant 
helps maintain a consistent baseline and prevents bias towards titles with very few votes.

### 2. Cosine Similarity Score [Content Based Filtering]

Cosine similarity is a measure of similarity between two vectors in a multi-dimensional space. It determines the cosine of the angle between the vectors, which represents their similarity. 

**Steps to follow:**

1. **Convert the data** : Represent the data points or documents as numerical vectors. This is typically done using techniques like TF-IDF (Term Frequency-Inverse Document Frequency) or word embeddings, which capture the importance of words or terms in the documents.
2. **Compute the dot product** : Take the dot product of the two vectors by multiplying the corresponding components and summing them. The dot product captures the similarity between the vectors based on their alignment in the vector space.
3. **Calculate the magnitudes** : Calculate the magnitude or Euclidean norm of each vector. This is done by taking the square root of the sum of the squares of the vector's components.
4. Compute the cosine similarity score: Divide the dot product by the product of the magnitudes of the two vectors. The resulting value is the cosine similarity score, ranging from -1 to 1. A score of 1 indicates that the vectors are identical, while a score of -1 indicates they are exactly opposite. A score of 0 suggests that the vectors are orthogonal or unrelated.

The cosine similarity score is widely used in various applications, such as information retrieval, text mining, and recommendation systems. It allows for efficient and effective comparison of documents or data points based on their similarity in a high-dimensional space.

Formula: ```cosine_similarity = (A · B) / (||A|| * ||B||)```


![Cosine Similarity](https://user-images.githubusercontent.com/36665975/70401457-a7530680-1a55-11ea-9158-97d4e8515ca4.png)


## Future Improvements

The movie recommendation system can be enhanced in several ways:

- Incorporating deep learning techniques, such as neural networks, to capture more intricate patterns and improve recommendation accuracy.

- Implementing a hybrid recommendation approach that combines collaborative filtering and content-based filtering for more robust and diverse recommendations.

- Enhancing the user interface and user experience to make the system more intuitive and user-friendly.

- Integrating external data sources, such as user reviews and social media data, to gather more information and improve the recommendation quality.

- Adding more search queries like Genre, Director Name & Actors name (currently works only on movies name).

## Contributing

Contributions to the movie recommendation system are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Make your changes and test thoroughly.

4. Commit your changes with clear and concise commit messages.

5. Push your branch to your forked repository.

6. Submit a pull request, describing your changes and their purpose.
