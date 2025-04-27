// 电影API服务
import { API_BASE_URL } from './apiConfig';

// 模拟电影数据
const mockFilms = [
  {
    id: 1,
    title: '点球成金 Monkeyball (2011)',
    url: 'https://movie.douban.com/subject/3023164/',
    types: '喜剧 / 传记 / 运动',
    duration: '133分钟',
    rating: '8.3',
    alias: '魔球(港/台) / 钱球 / 全垒',
    language: '英语',
    imdb: 't1120166',
    actors: '布拉德·皮特 / 乔纳·希尔 / 菲利普·塞默·霍夫曼 / 罗宾·怀特 / 克里斯·帕拉特 / 足球厅·帕西诺',
    director: '贝尼特·米勒'
  },
  {
    id: 2,
    title: '机器人总动员 WALL·E (2008)',
    url: 'https://movie.douban.com/subject/2131459/',
    types: '科幻 / 动画 / 冒险',
    duration: '98分钟',
    rating: '9.1',
    alias: '瓦力 / 太空奇兵·威E / 机械人总动员',
    language: '英语',
    imdb: 't0910970',
    actors: '本·贝尔特 / 艾丽莎·奈特 / 杰夫·格尔林 / 佛莱德·威拉特 / 西格妮·韦弗',
    director: '安德鲁·斯坦顿'
  },
  {
    id: 3,
    title: '千与千寻 千と千尋の神隠し (2001)',
    url: 'https://movie.douban.com/subject/1291561/',
    types: '动画 / 奇幻 / 冒险',
    duration: '125分钟',
    rating: '9.4',
    alias: '神隐少女 / 千与千寻的神隐 / 神隐',
    language: '日语',
    imdb: 't0245429',
    actors: '柊瑠美 / 入野自由 / 夏木真理 / 菅原文太 / 中村彰男',
    director: '宫崎骏'
  }
];

/**
 * 搜索电影
 * @param {string} query - 搜索查询
 * @returns {Promise<Array>} - 搜索结果
 */
export const searchFilms = async (query) => {
  if (!query) {
    return [];
  }
  
  try {
    // 构建搜索URL
    const url = `${API_BASE_URL}/search?desc=${encodeURIComponent(query)}`;
    
    // 发送GET请求
    const response = await fetch(url);
    
    // 解析响应数据
    const data = await response.json();
    
    // 记录API返回的原始数据到控制台
    console.log('API Response:', data);
    
    // 检查API调用是否成功
    if (!data.success) {
      console.error('API返回错误:', data.error_message);
      return [];
    }
    
    // 将API返回的数据转换为应用所需的格式
    return data.films.map((film, index) => ({
      id: index + 1,
      title: `${film.name_chinese} ${film.name_english} (${film.year})`,
      url: film.link,
      types: film.type,
      duration: `${film.duration_minutes}分钟`,
      rating: film.rating.toString(),
      alias: film.alias,
      language: film.language,
      imdb: film.imdb,
      actors: film.starring,
      director: film.director
    }));
  } catch (error) {
    console.error('API调用失败:', error);
    
    // API调用失败时使用模拟数据（开发阶段使用）
    console.warn('使用模拟数据作为备用');
    const results = [];
    for (let i = 0; i < 9; i++) {
      const randomIndex = Math.floor(Math.random() * mockFilms.length);
      const film = { ...mockFilms[randomIndex], id: i + 1 };
      results.push(film);
    }
    return results;
  }
};

/**
 * 获取电影详情
 * @param {number} id - 电影ID
 * @returns {Promise<Object>} - 电影详情
 */
export const getFilmDetails = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const film = mockFilms.find(f => f.id === parseInt(id, 10));
      if (film) {
        resolve(film);
      } else {
        reject(new Error('电影不存在'));
      }
    }, 300);
  });
}; 