import styled from "styled-components";

export const ProductCard = styled.div`
  .grid {
    width: 24rem;
    background-color: #fff;
    margin: 5px;
    height: 36rem;
    position: relative;
    .img {
      padding: 1rem;
      width: 100%;
      max-height: 75%;
      overflow: hidden;
      border-bottom: 2px solid #eee;
      img {
        width: 100%;
        max-width: 100%;
        // height: 100%;
        // max-height: 100%;
        cursor: pointer;
      }
    }
    .product-item-content {
      text-align: center;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;

      .details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        h4 {
          font-weight: 400;
          font-size: 1.8rem;
        }
        p {
          font-weight: 500;
          color: orangered;
        }
      }
      button {
        display: block;
        width: 100%;
      }
    }
  }

  .list {
    width: 100%;
    height: 28rem;
    max-height: 32rem;
    display: flex;
    background-color: #fff;
    margin: 1rem 0;
    .img {
      padding: 1rem;
      width: 100%;
      // max-width: 35%;
      height: 100%;
      overflow: hidden;
      border-right: 2px solid #eee;
      // border: 1px solid red;
      img {
        width: 100%;
        // height: 100%;
        max-height: 100%;
        cursor: pointer;
      }
    }

    .product-item-content {
      position: relative;
      padding: 1rem;
      width: 65%;
      .details {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        h4 {
          font-weight: 400;
        }
        p {
          font-weight: 500;
          color: var(--color-danger);
        }
      }
      button {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
      }
    }
  }  

  @media (max-width: 600px) {
    .list{
      .desc{
        height: 55%;
        overflow: hidden;
      }
    }
  }
`;
