import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
// Import getNews function from news.js

// We'll get to this one later
import Article from '../../components/Article';

async function getNews() {
  const url =
    'https://newsapi.org/v2/everything?q="feminicídio"&sortBy=publishedAt&domains:g1.globo.com,correiobraziliense.com.br,bbc.com/portuguese,cnnbrasil.com.br,veja.abril.com.br,www.folha.uol.com.br,https://noticias.uol.com.br/,&apiKey=cec00a3af80446c29f26d6718177cef0';
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {articles: [], refreshing: true};
    this.fetchNews = this.fetchNews.bind(this);
  }
  // Called after a component is mounted
  componentDidMount() {
    this.fetchNews();
  }

  fetchNews() {
    getNews()
      .then(articles => this.setState({articles, refreshing: false}))
      .catch(() => this.setState({refreshing: false}));
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true,
      },
      () => this.fetchNews(),
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headText}>Notícias</Text>
        <View style={styles.containerNews}>
          <FlatList
            data={this.state.articles}
            renderItem={({item}) => {
             if(item.title != null){
              return (
            <Article article={item} />
              );
             }
          }}
            keyExtractor={item => item.url}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)}
          />
        </View>
      </View>
    );
  }
}
