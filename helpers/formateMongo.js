export default function formateMongo(object) {
  return JSON.parse(JSON.stringify(object))
}