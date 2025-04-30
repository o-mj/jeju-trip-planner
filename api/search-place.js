// /api/search-place.js
export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const response = await fetch(`https://naveropenapi.apigw.ntruss.com/map-place/v1/search?query=${encodeURIComponent(query)}`, {
    headers: {
      'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_CLIENT_ID,
      'X-NCP-APIGW-API-KEY': process.env.NAVER_CLIENT_SECRET
    }
  });

  const data = await response.json();

  // 변환해서 프론트에 필요한 형태로 반환
  const addresses = (data.places || []).map(item => ({
    roadAddress: item.road_address,
    jibunAddress: item.address,
    x: item.x,
    y: item.y
  }));

  res.status(200).json({ addresses });
}
