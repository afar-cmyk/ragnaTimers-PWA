import DataSource from "../../database/DataSource.js";

export default function Thumbnails({
  type = "mvp",
  mvpName = "default",
  mapName = "default",
}) {
  if (!mvpName || !mapName) {
    mvpName = "default";
    mapName = "default";
  }

  let mvpImage = `/assets/images/mvps/${mvpName}.png`;
  let mapImage = `/assets/images/maps/${mapName}.gif`;

  const gradient =
    "linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%)";
  const gradient2 =
    "linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.18) 100%)";
  const backgroundImage = type == "map" ? mapImage : mvpImage;
  const backgroundPosition =
    type == "map"
      ? "-3px -2px"
      : DataSource[mvpName].settings.thumbnail.position;
  const backgroundSize =
    type == "map" ? "108%" : DataSource[mvpName].settings.thumbnail.size;

  let style = {
    background:
      `${gradient} no-repeat center / 100%, ` +
      `url(${backgroundImage}) no-repeat ${backgroundPosition} / ${backgroundSize}`,
  };

  let defaultStyle = {
    background:
      `${gradient2} no-repeat center / 100%, ` +
      `url(${backgroundImage}) no-repeat 0px 0px / 100%`,
    opacity: 0.7,
  };

  return mvpName == "default" && mapName == "default" ? (
    <div
      className="newMvp_thumbnail"
      style={{ ...defaultStyle, imageRendering: "pixelated" }}
    />
  ) : (
    <div className="newMvp_thumbnail" style={style} />
  );
}
